from fastapi import APIRouter, HTTPException, status, Depends, Response, Request
from fastapi.responses import RedirectResponse
from app.schemas.user import (
    UserOut,
    UserRegister,
    UserResponse,
    UserLogin,
    UserResetPassword,
    ForgotPasswordRequest,
)
from app.crud.user import get_user, create_user
from app.db.session import AsyncSession
from app.db.dependencies import get_db
from app.core.utils import verify_password
from app.core.security import (
    create_access_token,
    ACCESS_TOKEN_EXPIRE,
    REMEMBER_ME_EXPIRE,
    save_token_forgot_password,
    send_reset_mail,
    get_user_reset_password,
    update_password,
)
from app.core.auth import oauth
from datetime import datetime, timezone, timedelta
import secrets

router = APIRouter()


@router.post("/register", response_model=UserOut)
async def user_register(data: UserRegister, db: AsyncSession = Depends(get_db)):
    user = await get_user(db=db, user_email=data.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email address already registered",
        )
    try:
        new_user = await create_user(
            db=db,
            first_name=data.first_name,
            last_name=data.last_name,
            email=data.email,
            password=data.password,
        )
        return new_user
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating user",
        )


@router.post("/login", response_model=UserResponse)
async def user_login(
    user_data: UserLogin, response: Response, db: AsyncSession = Depends(get_db)
):
    user = await get_user(db=db, user_email=user_data.email)
    if not verify_password(user_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password"
        )
    access_token = await create_access_token(data={"sub": str(user.id)})
    remember_me = bool(user_data.remember_me)
    expire_duration = REMEMBER_ME_EXPIRE if remember_me else ACCESS_TOKEN_EXPIRE
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=int(expire_duration.total_seconds()),
        expires=int(expire_duration.total_seconds()),
        path="/",
    )
    return UserResponse(
        message="Login Successful",
        user=UserOut.model_validate(user),
        access_token=access_token,
    )


@router.post("/logout")
async def user_logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out succesfully"}


@router.get("/login/google")
async def login_google(request: Request):
    redirect_url = "http://localhost:8000/auth/callback"
    return await oauth.google.authorize_redirect(request, redirect_url)


@router.get("/auth/callback", name="auth_callback")
async def auth_callback(
    request: Request, response: Response, db: AsyncSession = Depends(get_db)
):
    try:
        token = await oauth.google.authorize_access_token(request)
        userinfo = token.get("userinfo")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Google Login Failed = {e} callback URL = {request.url}",
        )
    email = userinfo.get("email")
    first_name = userinfo.get("given_name")
    last_name = userinfo.get("family_name")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email not provided by Google",
        )
    user = await get_user(db=db, user_email=email)
    if not user:
        user = await create_user(
            db=db,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=None,
        )
    access_token = await create_access_token(
        data={"sub": str(user.id)}, remember_me=True
    )
    response = RedirectResponse(url="http://localhost:3000")
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=int(REMEMBER_ME_EXPIRE.total_seconds()),
        path="/",
    )
    return response


@router.post("/api/forgot-password")
async def forgot_password(
    data: ForgotPasswordRequest, db: AsyncSession = Depends(get_db)
):
    user = await get_user(db=db, user_email=data.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    token = secrets.token_urlsafe(32)
    expire = datetime.now(timezone.utc).replace(tzinfo=None) + timedelta(minutes=30)
    await save_token_forgot_password(
        db=db, email=user.email, token=token, expire=expire
    )
    reset_link = f"http://localhost:3000/login/reset-password?token={token}"
    await send_reset_mail(data.email, reset_link)


@router.post("/api/reset-password")
async def reset_password(data: UserResetPassword, db: AsyncSession = Depends(get_db)):
    user = await get_user_reset_password(db=db, token=data.token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or Token Expire"
        )
    await update_password(db=db, id=user.id, password=data.new_password)
    return {"message": "Password reset successfully"}
