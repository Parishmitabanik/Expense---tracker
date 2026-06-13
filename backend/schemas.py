from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str

class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category: str


class ExpenseResponse(BaseModel):
    id: int
    title: str
    amount: float
    category: str
    owner_id: int

    class Config:
        from_attributes = True