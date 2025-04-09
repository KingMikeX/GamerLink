from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi import HTTPException, status
from register_login.user_register_login import UserCreate, UserLogin
from models.user import User
from register_login.user_register_login import UserCreate
from utils.jwt_handler import create_access_token

# Passwort-Hashing-Kontext (bcrypt)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def register_user(user_data: UserCreate, db: Session):
    # Check: existiert E-Mail oder Username bereits?
    existing_user = db.query(User).filter(
        (User.email == user_data.email) | (User.username == user_data.username)
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ein Benutzer mit dieser E-Mail oder diesem Nutzernamen existiert bereits."
        )

    # Passwort hashen
    hashed_password = get_password_hash(user_data.password)

    # Neuen User anlegen
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        password_hash=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "id": str(new_user.id),
        "username": new_user.username,
        "email": new_user.email
    }

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def login_user(credentials: UserLogin, db: Session):
    user = db.query(User).filter(User.email == credentials.email).first()

    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-Mail oder Passwort ist ungültig"
        )

    token = create_access_token({"sub": str(user.id)})

    return {
    "access_token": token,
    "token_type": "bearer"
    }