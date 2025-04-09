from pydantic import BaseModel, EmailStr, constr
from typing import Optional, List
from typing import Optional, List
from pydantic import BaseModel

UserName: type = constr(min_length=3, max_length=50)
PasswordStr: type = constr(min_length=6)

class UserCreate(BaseModel):
    username: UserName # type: ignore
    email: EmailStr
    password: PasswordStr # type: ignore

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserProfileUpdate(BaseModel):
    region: Optional[str] = None
    main_game: Optional[str] = None
    rank: Optional[str] = None
    play_style: Optional[str] = None
    platform: Optional[str] = None
    favorite_games: Optional[List[str]] = None
    bio: Optional[str] = None

class PublicUserProfile(BaseModel):
    username: str
    region: Optional[str]
    main_game: Optional[str]
    rank: Optional[str]
    play_style: Optional[str]
    platform: Optional[str]
    favorite_games: Optional[List[str]]
    bio: Optional[str]

    class Config:
        orm_mode = True