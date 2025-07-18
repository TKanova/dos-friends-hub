"""
Database setup script for DOS Friend's Hub with Email Verification
Run this script to create initial collections and indexes
"""

import asyncio
import motor.motor_asyncio
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")

async def setup_database():
    client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)
    database = client.dos_friends_hub
    
    # Create collections
    events_collection = database.events
    users_collection = database.users
    rsvps_collection = database.rsvps
    messages_collection = database.messages
    verification_tokens_collection = database.verification_tokens
    
    print("Setting up database collections and indexes...")
    
    # Create indexes for better performance
    await events_collection.create_index("date")
    await events_collection.create_index("category")
    await events_collection.create_index("location")
    
    await users_collection.create_index("email", unique=True)
    await users_collection.create_index("username")
    await users_collection.create_index("is_verified")
    
    await rsvps_collection.create_index([("event_id", 1), ("user_id", 1)], unique=True)
    await rsvps_collection.create_index("event_id")
    await rsvps_collection.create_index("user_id")
    
    await messages_collection.create_index("channel")
    await messages_collection.create_index("created_at")
    
    # New indexes for verification tokens
    await verification_tokens_collection.create_index("token", unique=True)
    await verification_tokens_collection.create_index("user_id")
    await verification_tokens_collection.create_index("token_type")
    await verification_tokens_collection.create_index("created_at", expireAfterSeconds=86400)  # 24 hours TTL
    
    print("Database setup completed successfully!")
    client.close()

if __name__ == "__main__":
    asyncio.run(setup_database())
