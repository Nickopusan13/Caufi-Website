from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime, date
from app.schemas.address import AddressInput
from app.schemas.to_camel import to_camel


class UserLogin(BaseModel):
    email: EmailStr
    password: str
    remember_me: bool = False
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

class UserRegister(BaseModel):
    first_name: str
    last_name: str
    password: str
    email: EmailStr
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

class UserUpdate(BaseModel):
    first_name: str
    middle_name: str | None = None
    last_name: str
    email: EmailStr
    phone_number: str | None = None
    birthday: date | None = None
    image: str | None = None
    is_active: bool
    addresses: list[AddressInput] | None = None
    model_config = ConfigDict(
        from_attributes=True, alias_generator=to_camel, populate_by_name=True
    )

class UserOut(UserUpdate):
    id: int
    register_time: datetime
    model_config = ConfigDict(
        from_attributes=True, alias_generator=to_camel, populate_by_name=True
    )

class UserResponse(BaseModel):
    message: str
    user: UserOut
    access_token: str
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

class UserResetPassword(BaseModel):
    token: str
    new_password: str
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

class ForgotPasswordRequest(BaseModel):
    email: EmailStr
