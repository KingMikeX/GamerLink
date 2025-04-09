from pydantic import BaseModel, EmailStr, constr

UserName: type = constr(min_length=3, max_length=50)
PasswordStr: type = constr(min_length=6)

class UserCreate(BaseModel):
    username: UserName # type: ignore
    email: EmailStr
    password: PasswordStr # type: ignore