from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime, timedelta
import json
import motor.motor_asyncio
from bson import ObjectId
import os
from dotenv import load_dotenv
import re

# Import authentication modules
from auth_updated import (
    Token, UserLogin, UserRegister, UserResponse, EmailVerification, ResendVerification,
    verify_password, get_password_hash, create_access_token, create_refresh_token,
    verify_token, get_current_user, get_current_user_optional_verification, validate_password
)

from email_service import email_service, generate_verification_token, is_token_expired

load_dotenv()

app = FastAPI(title="DOS Friend's Hub API with Email Verification", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)
database = client.dos_friends_hub

# Collections
events_collection = database.events
users_collection = database.users
rsvps_collection = database.rsvps
messages_collection = database.messages
verification_tokens_collection = database.verification_tokens

# WebSocket connection manager for real-time chat
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.channel_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, channel: str = "general"):
        await websocket.accept()
        self.active_connections.append(websocket)
        if channel not in self.channel_connections:
            self.channel_connections[channel] = []
        self.channel_connections[channel].append(websocket)

    def disconnect(self, websocket: WebSocket, channel: str = "general"):
        self.active_connections.remove(websocket)
        if channel in self.channel_connections:
            self.channel_connections[channel].remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast_to_channel(self, message: str, channel: str):
        if channel in self.channel_connections:
            for connection in self.channel_connections[channel]:
                try:
                    await connection.send_text(message)
                except:
                    # Remove dead connections
                    self.channel_connections[channel].remove(connection)

manager = ConnectionManager()

# Existing Pydantic models
class Event(BaseModel):
    title: str
    description: str
    date: str
    time: str
    location: str
    address: str
    category: str
    image_url: Optional[str] = None

class EventResponse(BaseModel):
    id: str
    title: str
    description: str
    date: str
    time: str
    location: str
    address: str
    category: str
    organizer_id: str
    organizer_name: str
    image_url: Optional[str] = None
    created_at: datetime
    rsvp_count: Dict[str, int]

class RSVP(BaseModel):
    event_id: str
    status: str  # "going", "maybe", "not_going"

class Message(BaseModel):
    channel: str
    message: str

# Helper functions
def event_helper(event) -> dict:
    return {
        "id": str(event["_id"]),
        "title": event["title"],
        "description": event["description"],
        "date": event["date"],
        "time": event["time"],
        "location": event["location"],
        "address": event["address"],
        "category": event["category"],
        "organizer_id": event["organizer_id"],
        "image_url": event.get("image_url"),
        "created_at": event["created_at"]
    }

def message_helper(message) -> dict:
    return {
        "id": str(message["_id"]),
        "channel": message["channel"],
        "user_id": message["user_id"],
        "username": message["username"],
        "message": message["message"],
        "avatar_url": message.get("avatar_url"),
        "created_at": message["created_at"]
    }

def validate_email(email: str) -> bool:
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

# Authentication endpoints with email verification
@app.post("/api/auth/register", response_model=dict)
async def register(user_data: UserRegister):
    # Validate input
    if not validate_email(user_data.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email format"
        )
    
    if user_data.password != user_data.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )
    
    if not validate_password(user_data.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters long and contain uppercase, lowercase, and numeric characters"
        )
    
    # Check if user already exists
    existing_user = await users_collection.find_one({
        "$or": [
            {"email": user_data.email},
            {"username": user_data.username}
        ]
    })
    
    if existing_user:
        if existing_user["email"] == user_data.email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
    
    # Hash password and create user
    hashed_password = get_password_hash(user_data.password)
    user_dict = {
        "username": user_data.username,
        "email": user_data.email,
        "password": hashed_password,
        "avatar_url": f"/placeholder.svg?height=32&width=32",
        "created_at": datetime.utcnow(),
        "is_active": True,
        "is_verified": False  # Email not verified yet
    }
    
    result = await users_collection.insert_one(user_dict)
    user_id = str(result.inserted_id)
    
    # Generate verification token
    verification_token = generate_verification_token()
    token_dict = {
        "user_id": user_id,
        "token": verification_token,
        "token_type": "email_verification",
        "created_at": datetime.utcnow(),
        "used": False
    }
    
    await verification_tokens_collection.insert_one(token_dict)
    
    # Send verification email
    email_sent = email_service.send_verification_email(
        user_data.email, 
        user_data.username, 
        verification_token
    )
    
    if not email_sent:
        # If email fails, we should still allow the user to be created
        # but inform them about the email issue
        print(f"Failed to send verification email to {user_data.email}")
    
    # Create tokens (user can use the app but with limited functionality)
    access_token = create_access_token(
        data={"sub": user_id, "username": user_data.username}
    )
    refresh_token = create_refresh_token(
        data={"sub": user_id, "username": user_data.username}
    )
    
    return {
        "message": "Registration successful! Please check your email to verify your account.",
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "username": user_data.username,
            "email": user_data.email,
            "avatar_url": f"/placeholder.svg?height=32&width=32",
            "is_verified": False
        },
        "email_sent": email_sent
    }

@app.post("/api/auth/verify-email", response_model=dict)
async def verify_email(verification_data: EmailVerification):
    # Find the verification token
    token_doc = await verification_tokens_collection.find_one({
        "token": verification_data.token,
        "token_type": "email_verification",
        "used": False
    })
    
    if not token_doc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired verification token"
        )
    
    # Check if token is expired (24 hours)
    if is_token_expired(token_doc["created_at"], hours=24):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Verification token has expired. Please request a new one."
        )
    
    # Find the user
    user = await users_collection.find_one({"_id": ObjectId(token_doc["user_id"])})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if user.get("is_verified", False):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already verified"
        )
    
    # Update user as verified
    await users_collection.update_one(
        {"_id": ObjectId(token_doc["user_id"])},
        {"$set": {"is_verified": True, "verified_at": datetime.utcnow()}}
    )
    
    # Mark token as used
    await verification_tokens_collection.update_one(
        {"_id": token_doc["_id"]},
        {"$set": {"used": True, "used_at": datetime.utcnow()}}
    )
    
    # Send welcome email
    email_service.send_welcome_email(user["email"], user["username"])
    
    return {
        "message": "Email verified successfully! Welcome to DOS Friend's Hub!",
        "user": {
            "id": str(user["_id"]),
            "username": user["username"],
            "email": user["email"],
            "avatar_url": user.get("avatar_url"),
            "is_verified": True
        }
    }

@app.post("/api/auth/resend-verification", response_model=dict)
async def resend_verification(resend_data: ResendVerification):
    # Find user by email
    user = await users_collection.find_one({"email": resend_data.email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if user.get("is_verified", False):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already verified"
        )
    
    # Check if there's a recent verification token (prevent spam)
    recent_token = await verification_tokens_collection.find_one({
        "user_id": str(user["_id"]),
        "token_type": "email_verification",
        "created_at": {"$gte": datetime.utcnow() - timedelta(minutes=5)}
    })
    
    if recent_token:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Please wait 5 minutes before requesting another verification email"
        )
    
    # Generate new verification token
    verification_token = generate_verification_token()
    token_dict = {
        "user_id": str(user["_id"]),
        "token": verification_token,
        "token_type": "email_verification",
        "created_at": datetime.utcnow(),
        "used": False
    }
    
    await verification_tokens_collection.insert_one(token_dict)
    
    # Send verification email
    email_sent = email_service.send_verification_email(
        user["email"], 
        user["username"], 
        verification_token
    )
    
    if not email_sent:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send verification email. Please try again later."
        )
    
    return {
        "message": "Verification email sent successfully! Please check your inbox."
    }

@app.post("/api/auth/login", response_model=dict)
async def login(user_credentials: UserLogin):
    # Find user by email
    user = await users_collection.find_one({"email": user_credentials.email})
    
    if not user or not verify_password(user_credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account is deactivated"
        )
    
    # Create tokens
    access_token = create_access_token(
        data={"sub": str(user["_id"]), "username": user["username"]}
    )
    refresh_token = create_refresh_token(
        data={"sub": str(user["_id"]), "username": user["username"]}
    )
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {
            "id": str(user["_id"]),
            "username": user["username"],
            "email": user["email"],
            "avatar_url": user.get("avatar_url"),
            "is_verified": user.get("is_verified", False)
        }
    }

@app.post("/api/auth/refresh", response_model=dict)
async def refresh_token(refresh_token: str):
    try:
        token_data = verify_token(refresh_token, token_type="refresh")
        
        # Create new access token
        access_token = create_access_token(
            data={"sub": token_data.user_id, "username": token_data.username}
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer"
        }
    except HTTPException:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )

@app.get("/api/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user_optional_verification)):
    return UserResponse(**current_user)

@app.post("/api/auth/logout")
async def logout(current_user: dict = Depends(get_current_user_optional_verification)):
    # In a production app, you might want to blacklist the token
    return {"message": "Successfully logged out"}

# Protected event endpoints (require email verification)
@app.post("/api/events", response_model=EventResponse)
async def create_event(event: Event, current_user: dict = Depends(get_current_user)):
    event_dict = event.dict()
    event_dict["organizer_id"] = current_user["id"]
    event_dict["created_at"] = datetime.utcnow()
    
    result = await events_collection.insert_one(event_dict)
    new_event = await events_collection.find_one({"_id": result.inserted_id})
    
    # Get RSVP count
    rsvp_count = await get_rsvp_count(str(result.inserted_id))
    
    response = event_helper(new_event)
    response["rsvp_count"] = rsvp_count
    response["organizer_name"] = current_user["username"]
    
    return response

@app.get("/api/events", response_model=List[EventResponse])
async def get_events(category: Optional[str] = None, location: Optional[str] = None):
    query = {}
    if category and category != "All":
        query["category"] = category
    if location and location != "All":
        query["address"] = {"$regex": location, "$options": "i"}
    
    events = []
    async for event in events_collection.find(query).sort("date", 1):
        # Get organizer info
        organizer = await users_collection.find_one({"_id": ObjectId(event["organizer_id"])})
        organizer_name = organizer["username"] if organizer else "Unknown"
        
        event_data = event_helper(event)
        event_data["rsvp_count"] = await get_rsvp_count(event_data["id"])
        event_data["organizer_name"] = organizer_name
        events.append(event_data)
    
    return events

@app.get("/api/events/{event_id}", response_model=EventResponse)
async def get_event(event_id: str):
    if not ObjectId.is_valid(event_id):
        raise HTTPException(status_code=400, detail="Invalid event ID")
    
    event = await events_collection.find_one({"_id": ObjectId(event_id)})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Get organizer info
    organizer = await users_collection.find_one({"_id": ObjectId(event["organizer_id"])})
    organizer_name = organizer["username"] if organizer else "Unknown"
    
    event_data = event_helper(event)
    event_data["rsvp_count"] = await get_rsvp_count(event_id)
    event_data["organizer_name"] = organizer_name
    
    return event_data

# Protected RSVP endpoints (require email verification)
@app.post("/api/rsvps")
async def create_rsvp(rsvp: RSVP, current_user: dict = Depends(get_current_user)):
    # Check if event exists
    event = await events_collection.find_one({"_id": ObjectId(rsvp.event_id)})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Check if RSVP already exists
    existing_rsvp = await rsvps_collection.find_one({
        "event_id": rsvp.event_id,
        "user_id": current_user["id"]
    })
    
    rsvp_dict = {
        "event_id": rsvp.event_id,
        "user_id": current_user["id"],
        "status": rsvp.status,
        "created_at": datetime.utcnow()
    }
    
    if existing_rsvp:
        # Update existing RSVP
        await rsvps_collection.update_one(
            {"_id": existing_rsvp["_id"]},
            {"$set": {"status": rsvp.status, "updated_at": datetime.utcnow()}}
        )
    else:
        # Create new RSVP
        await rsvps_collection.insert_one(rsvp_dict)
    
    return {"message": "RSVP updated successfully"}

@app.get("/api/rsvps/my")
async def get_my_rsvps(current_user: dict = Depends(get_current_user)):
    rsvps = []
    async for rsvp in rsvps_collection.find({"user_id": current_user["id"]}):
        # Get event details
        event = await events_collection.find_one({"_id": ObjectId(rsvp["event_id"])})
        if event:
            rsvp_data = {
                "id": str(rsvp["_id"]),
                "event": event_helper(event),
                "status": rsvp["status"],
                "created_at": rsvp["created_at"]
            }
            rsvps.append(rsvp_data)
    
    return rsvps

async def get_rsvp_count(event_id: str) -> Dict[str, int]:
    pipeline = [
        {"$match": {"event_id": event_id}},
        {"$group": {"_id": "$status", "count": {"$sum": 1}}}
    ]
    
    counts = {"going": 0, "maybe": 0, "not_going": 0}
    async for result in rsvps_collection.aggregate(pipeline):
        counts[result["_id"]] = result["count"]
    
    return counts

# Protected chat endpoints (require email verification)
@app.get("/api/messages/{channel}")
async def get_messages(channel: str, limit: int = 50, current_user: dict = Depends(get_current_user)):
    messages = []
    async for message in messages_collection.find({"channel": channel}).sort("created_at", -1).limit(limit):
        messages.append(message_helper(message))
    
    return list(reversed(messages))

@app.post("/api/messages")
async def create_message(message: Message, current_user: dict = Depends(get_current_user)):
    message_dict = {
        "channel": message.channel,
        "user_id": current_user["id"],
        "username": current_user["username"],
        "message": message.message,
        "avatar_url": current_user.get("avatar_url"),
        "created_at": datetime.utcnow()
    }
    
    result = await messages_collection.insert_one(message_dict)
    new_message = await messages_collection.find_one({"_id": result.inserted_id})
    
    # Broadcast to WebSocket connections
    message_data = message_helper(new_message)
    await manager.broadcast_to_channel(
        json.dumps(message_data, default=str),
        message.channel
    )
    
    return message_data

# WebSocket endpoint for real-time chat (protected)
@app.websocket("/ws/{channel}/{token}")
async def websocket_endpoint(websocket: WebSocket, channel: str, token: str):
    try:
        # Verify token
        token_data = verify_token(token)
        await manager.connect(websocket, channel)
        
        while True:
            data = await websocket.receive_text()
            # Process and broadcast message
            await manager.broadcast_to_channel(data, channel)
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        manager.disconnect(websocket, channel)

@app.get("/")
async def root():
    return {"message": "DOS Friend's Hub API with Email Verification"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
