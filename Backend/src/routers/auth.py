from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from db.database import SessionLocal
from register_login.user_register_login import UserCreate
from controllers.auth_controller import register_user

auth_router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# DB-Session Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@auth_router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    return register_user(user_data, db)
