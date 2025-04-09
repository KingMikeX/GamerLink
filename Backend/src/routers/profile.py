from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from register_login.user_register_login import UserProfileUpdate
from utils.auth_dependencies import get_current_user, get_db
from models.user import User
from models.user_profile import UserProfile
from models.user import User
from register_login.user_register_login import PublicUserProfile

profile_router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)

@profile_router.get("/me")
def get_own_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profil wurde nicht gefunden."
        )

    return {
        "user_id": str(profile.user_id),
        "region": profile.region,
        "main_game": profile.main_game,
        "rank": profile.rank,
        "platform": profile.platform,
        "play_style": profile.play_style,
        "favorite_games": profile.favorite_games,
        "bio": profile.bio,
        "created_at": profile.created_at
    }

@profile_router.put("/update")
def update_own_profile(
    updated_data: UserProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profil nicht gefunden"
        )

    # Nur die Felder aktualisieren, die im Request gesendet wurden
    for field, value in updated_data.dict(exclude_unset=True).items():
        setattr(profile, field, value)

    db.commit()
    db.refresh(profile)

    return {
        "message": "Profil erfolgreich aktualisiert.",
        "profile": {
            "region": profile.region,
            "main_game": profile.main_game,
            "rank": profile.rank,
            "platform": profile.platform,
            "play_style": profile.play_style,
            "favorite_games": profile.favorite_games,
            "bio": profile.bio,
            "created_at": profile.created_at
        }
    }

@profile_router.get("/{username}", response_model=PublicUserProfile)
def get_profile_by_username(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Benutzer nicht gefunden."
        )

    profile = db.query(UserProfile).filter(UserProfile.user_id == user.id).first()

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profil für diesen Benutzer nicht gefunden."
        )

    return PublicUserProfile(
        username=user.username,
        region=profile.region,
        main_game=profile.main_game,
        rank=profile.rank,
        play_style=profile.play_style,
        platform=profile.platform,
        favorite_games=profile.favorite_games,
        bio=profile.bio
    )