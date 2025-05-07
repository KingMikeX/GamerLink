from fastapi import APIRouter, Depends, HTTPException, status
from fastapi import UploadFile, File
from sqlalchemy.orm import Session
from register_login.user_register_login import UserProfileUpdate
from utils.auth_dependencies import get_current_user, get_db
from models.user import User
from models.user_profile import UserProfile
from models.user import User
from register_login.user_register_login import PublicUserProfile
from uuid import uuid4
from pathlib import Path
from datetime import timezone, datetime

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
        # ✅ Felder aus User-Tabelle
        "user_id": str(current_user.id),
        "username": current_user.username,
        "email": current_user.email,

        # ✅ Felder aus UserProfile-Tabelle
        "region": profile.region,
        "main_game": profile.main_game,
        "rank": profile.rank,
        "platform": profile.platform,
        "play_style": profile.play_style,
        "favorite_games": profile.favorite_games,
        "bio": profile.bio,
        "created_at": profile.created_at,
        "profile_picture": profile.profile_picture,
        "birthdate": profile.birthdate,
        "languages": profile.languages,
        "discord": profile.discord,
        "steam": profile.steam,
        "twitch": profile.twitch,
        "youtube": profile.youtube,
        "is_public": profile.is_public,
        "is_online": profile.is_online,
        "allow_notifications": profile.allow_notifications,
        "allow_friend_requests": profile.allow_friend_requests
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
            "created_at": profile.created_at,
            "birthdate": profile.birthdate,
            "languages": profile.languages,
            "discord": profile.discord,
            "steam": profile.steam,
            "twitch": profile.twitch,
            "youtube": profile.youtube,
            "is_public": profile.is_public,
            "is_online": profile.is_online,
            "allow_notifications": profile.allow_notifications,
            "allow_friend_requests": profile.allow_friend_requests
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
    
    profile = db.query(UserProfile).filter(UserProfile.user_id == user.id).first()

    if not profile or not profile.is_public:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profil für diesen Benutzer ist nicht öffentlich oder existiert nicht."
        )

    return PublicUserProfile(
        username=user.username,
        region=profile.region,
        main_game=profile.main_game,
        rank=profile.rank,
        play_style=profile.play_style,
        platform=profile.platform,
        favorite_games=profile.favorite_games,
        bio=profile.bio,
        profile_picture=profile.profile_picture,
        birthdate=profile.birthdate,
        languages=profile.languages,
        discord=profile.discord,
        steam=profile.steam,
        twitch=profile.twitch,
        youtube=profile.youtube,
        is_online=profile.is_online
    )


# Lokaler Speicherort für Profilbilder
BASE_DIR = Path(__file__).resolve().parent.parent  # /src/
UPLOAD_DIR = BASE_DIR / "uploads" / "profile_pictures"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@profile_router.post("/upload-picture")
async def upload_profile_picture(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Nur Bildformate zulassen
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Nur Bilddateien sind erlaubt.")

    # Eindeutiger Dateiname mit UUID
    filename = f"{uuid4().hex}_{file.filename}"
    file_path = UPLOAD_DIR / filename

    # Datei speichern
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Bildpfad in die Datenbank schreiben
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profil nicht gefunden.")

    # Öffentlicher Pfad für statischen Zugriff
    profile.profile_picture = f"/static/profile_pictures/{filename}"
    db.commit()

    return {
        "message": "Profilbild erfolgreich hochgeladen.",
        "profile_picture": profile.profile_picture
    }


@profile_router.post("/logout")
def logout_user(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()

    if not profile:
        raise HTTPException(status_code=404, detail="Profil nicht gefunden.")

    profile.is_online = False
    # Optional: Profil zuletzt gesehen Zeit setzen
    # profile.last_seen = datetime.now(timezone.utc)

    db.commit()

    return {"message": "Du wurdest erfolgreich ausgeloggt."}