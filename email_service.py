import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
import os
from dotenv import load_dotenv
import secrets
from datetime import datetime, timedelta

load_dotenv()

# Email configuration
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

class EmailService:
    def __init__(self):
        self.smtp_server = SMTP_SERVER
        self.smtp_port = SMTP_PORT
        self.email_address = EMAIL_ADDRESS
        self.email_password = EMAIL_PASSWORD
        self.frontend_url = FRONTEND_URL

    def send_email(self, to_email: str, subject: str, html_content: str, text_content: str = None):
        """Send an email with HTML content"""
        try:
            # Create message
            message = MIMEMultipart("alternative")
            message["Subject"] = subject
            message["From"] = self.email_address
            message["To"] = to_email

            # Create text and HTML parts
            if text_content:
                text_part = MIMEText(text_content, "plain")
                message.attach(text_part)
            
            html_part = MIMEText(html_content, "html")
            message.attach(html_part)

            # Create secure connection and send email
            context = ssl.create_default_context()
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls(context=context)
                server.login(self.email_address, self.email_password)
                server.sendmail(self.email_address, to_email, message.as_string())
            
            return True
        except Exception as e:
            print(f"Error sending email: {e}")
            return False

    def send_verification_email(self, to_email: str, username: str, verification_token: str):
        """Send email verification email"""
        verification_url = f"{self.frontend_url}/verify-email?token={verification_token}"
        
        subject = "Verify Your DOS Friend's Hub Account"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify Your Account</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }}
                .header {{
                    background: linear-gradient(135deg, #FF6F00 0%, #E65100 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }}
                .content {{
                    background: #f9f9f9;
                    padding: 30px;
                    border-radius: 0 0 10px 10px;
                }}
                .button {{
                    display: inline-block;
                    background: #FF6F00;
                    color: white;
                    padding: 15px 30px;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                    margin: 20px 0;
                }}
                .button:hover {{
                    background: #E65100;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 30px;
                    color: #666;
                    font-size: 14px;
                }}
                .logo {{
                    font-size: 24px;
                    font-weight: bold;
                }}
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">DOS Friend's Hub</div>
                <h1>Welcome to the Community!</h1>
            </div>
            <div class="content">
                <h2>Hi {username}!</h2>
                <p>Thank you for joining DOS Friend's Hub! We're excited to have you as part of our community where youth and students connect through local events.</p>
                
                <p>To complete your registration and start exploring events, please verify your email address by clicking the button below:</p>
                
                <div style="text-align: center;">
                    <a href="{verification_url}" class="button">Verify My Email</a>
                </div>
                
                <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #FF6F00;">{verification_url}</p>
                
                <p><strong>This verification link will expire in 24 hours.</strong></p>
                
                <p>Once verified, you'll be able to:</p>
                <ul>
                    <li>🎵 Discover local music, education, and sports events</li>
                    <li>📅 Create and organize your own events</li>
                    <li>💬 Chat with other community members</li>
                    <li>✅ RSVP to events you're interested in</li>
                </ul>
                
                <p>If you didn't create an account with us, please ignore this email.</p>
            </div>
            <div class="footer">
                <p>© 2024 DOS Friend's Hub. All rights reserved.</p>
                <p>This email was sent to {to_email}</p>
            </div>
        </body>
        </html>
        """
        
        text_content = f"""
        Welcome to DOS Friend's Hub!
        
        Hi {username}!
        
        Thank you for joining DOS Friend's Hub! To complete your registration, please verify your email address by visiting:
        
        {verification_url}
        
        This verification link will expire in 24 hours.
        
        If you didn't create an account with us, please ignore this email.
        
        © 2024 DOS Friend's Hub
        """
        
        return self.send_email(to_email, subject, html_content, text_content)

    def send_welcome_email(self, to_email: str, username: str):
        """Send welcome email after successful verification"""
        subject = "Welcome to DOS Friend's Hub! 🎉"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to DOS Friend's Hub</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }}
                .header {{
                    background: linear-gradient(135deg, #00BFA5 0%, #00A693 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }}
                .content {{
                    background: #f9f9f9;
                    padding: 30px;
                    border-radius: 0 0 10px 10px;
                }}
                .button {{
                    display: inline-block;
                    background: #FF6F00;
                    color: white;
                    padding: 15px 30px;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                    margin: 20px 0;
                }}
                .feature {{
                    background: white;
                    padding: 20px;
                    margin: 15px 0;
                    border-radius: 8px;
                    border-left: 4px solid #FF6F00;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 30px;
                    color: #666;
                    font-size: 14px;
                }}
                .logo {{
                    font-size: 24px;
                    font-weight: bold;
                }}
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">DOS Friend's Hub</div>
                <h1>🎉 Account Verified Successfully!</h1>
            </div>
            <div class="content">
                <h2>Welcome aboard, {username}!</h2>
                <p>Your email has been verified and your account is now active. You're all set to start connecting with your local community!</p>
                
                <div class="feature">
                    <h3>🎵 Discover Events</h3>
                    <p>Browse music festivals, educational workshops, sports tournaments, and more happening in your area.</p>
                </div>
                
                <div class="feature">
                    <h3>📅 Create Events</h3>
                    <p>Organize your own events and bring people together around shared interests.</p>
                </div>
                
                <div class="feature">
                    <h3>💬 Join Conversations</h3>
                    <p>Connect with like-minded people in our community chat rooms.</p>
                </div>
                
                <div class="feature">
                    <h3>✅ RSVP & Track</h3>
                    <p>Keep track of events you're attending and manage your schedule.</p>
                </div>
                
                <div style="text-align: center;">
                    <a href="{self.frontend_url}" class="button">Start Exploring Events</a>
                </div>
                
                <p>Need help getting started? Check out our community guidelines or reach out to our support team.</p>
            </div>
            <div class="footer">
                <p>© 2024 DOS Friend's Hub. All rights reserved.</p>
                <p>Happy connecting!</p>
            </div>
        </body>
        </html>
        """
        
        return self.send_email(to_email, subject, html_content)

# Create global email service instance
email_service = EmailService()

def generate_verification_token() -> str:
    """Generate a secure verification token"""
    return secrets.token_urlsafe(32)

def is_token_expired(created_at: datetime, hours: int = 24) -> bool:
    """Check if a token has expired"""
    expiry_time = created_at + timedelta(hours=hours)
    return datetime.utcnow() > expiry_time
