from jose import JWTError, jwt
from dotenv import load_dotenv
from datetime import timedelta, datetime, timezone
from fastapi import Request, HTTPException, status
from app.core.utils import hash_token, hash_password
from app.db.session import AsyncSession
from app.db.models.user import User, PasswordReset
from sqlalchemy import select, update, delete, insert
from email.message import EmailMessage
import os
import smtplib

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITM = "HS256"
ACCESS_TOKEN_EXPIRE = timedelta(days=7)
REMEMBER_ME_EXPIRE = timedelta(days=90)

async def create_access_token(data:dict, remember_me:bool = False):
    to_encode = data.copy()
    ex = REMEMBER_ME_EXPIRE if remember_me else ACCESS_TOKEN_EXPIRE
    expire = datetime.now(timezone.utc) + ex
    to_encode.update({'exp':expire})
    return jwt.encode(to_encode, key=SECRET_KEY, algorithm=ALGORITM)

async def verify_token(request:Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token is Missing"
        )
    try:
        payload = jwt.decode(token=token, key=SECRET_KEY, algorithms=[ALGORITM])
        return int(payload.get("sub"))
    except JWTError as e:
        print("JWT Error:", e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

async def save_token_forgot_password(db:AsyncSession, email:str, token:str, expire:int):
    hashed_token = hash_token(token)
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()
    if not user:
        return None
    await db.execute(delete(PasswordReset).where(PasswordReset.user_id == user.id))
    stmt = insert(PasswordReset).values(user_id=user.id, token=hashed_token, expire=expire)
    await db.execute(stmt)
    await db.commit()
    return user

async def get_user_reset_password(db:AsyncSession, token:str):
    hashed_token = hash_token(token)
    query = (select(User).join(User.password_reset_token).where(PasswordReset.token == hashed_token))
    result = await db.execute(query)
    return result.scalar_one_or_none()
    
async def update_password(db:AsyncSession, id:int, password:str):
    hashed_pw = hash_password(password)
    query_user = (update(User).where(User.id == id).values(
        password=hashed_pw,
    ))
    await db.execute(query_user)
    query_token = (delete(PasswordReset).where(PasswordReset.user_id == id))
    await db.execute(query_token)
    await db.commit()

async def send_reset_mail(email:str, reset_link:str):
    msg = EmailMessage()
    msg["Subject"] = "Reset Password Token (CAUFI)"
    msg["From"] = "nickoguntara123@gmail.com"
    msg["To"] = email
    msg.set_content(f"Click link down below to reset your password:\n{reset_link}\nDON'T SHARE THIS LINK TO ANYONE")
    with smtplib.SMTP("sandbox.smtp.mailtrap.io", 587) as smpt:
        smpt.starttls()
        smpt.login(user="2705c3a86d16f1", password="3eb933f67858ce")
        smpt.send_message(msg)