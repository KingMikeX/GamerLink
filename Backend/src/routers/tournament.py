from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime, timezone

from models.tournament_data import Tournament
from models.tournament_participant import TournamentParticipant
from models.user import User
from utils.auth_dependencies import get_current_user, get_db
from pydantic import BaseModel, constr, field_validator
from typing import Annotated, List

tournament_router = APIRouter(
    prefix="/tournaments",
    tags=["Tournaments"]
)

# 📥 Request Body für Turniererstellung
class TournamentCreate(BaseModel):
    name: Annotated[str, constr(min_length=3, max_length=100)]
    game: str
    niveau: str
    start_time: datetime
    duration_minutes: int
    max_players: int
    description: str


    @field_validator("start_time")
    @classmethod
    def validate_start_time(cls, value: datetime) -> datetime:
        now = datetime.now(timezone.utc)
        if value < now:
            raise ValueError("Startzeitpunkt darf nicht in der Vergangenheit liegen.")
        return value


class TournamentOut(BaseModel):
    id: UUID
    name: str
    game: str
    niveau: str
    start_time: datetime
    duration_minutes: int
    max_players: int
    description: str
    created_at: datetime
    created_by_username: str  # 👈 statt UUID

    class Config:
        from_attributes = True

class ParticipantOut(BaseModel):
    user_id: UUID
    username: str
    joined_at: datetime

    class Config:
        from_attributes = True



class MyTournamentOut(BaseModel):
    id: UUID
    name: str
    game: str
    niveau: str
    start_time: datetime
    duration_minutes: int
    max_players: int
    description: str
    created_at: datetime
    created_by_username: str

    class Config:
        from_attributes = True





@tournament_router.post("/create")
def create_tournament(
    tournament_data: TournamentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Nur Admins dürfen Turniere erstellen
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Nur Admins dürfen Turniere erstellen."
        )

    tournament = Tournament(
        name=tournament_data.name,
        game=tournament_data.game,
        niveau=tournament_data.niveau,
        start_time=tournament_data.start_time,
        duration_minutes=tournament_data.duration_minutes,
        max_players=tournament_data.max_players,
        description=tournament_data.description,
        created_by=current_user.id
    )

    db.add(tournament)
    db.commit()
    db.refresh(tournament)

    return {
        "message": "Turnier erfolgreich erstellt.",
        "tournament_id": str(tournament.id)
    }



@tournament_router.get("/me", response_model=List[MyTournamentOut])
def get_my_tournaments(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    tournaments = (
        db.query(Tournament)
        .join(TournamentParticipant, TournamentParticipant.tournament_id == Tournament.id)
        .filter(TournamentParticipant.user_id == current_user.id)
        .order_by(Tournament.start_time.asc())
        .all()
    )

    result = []
    for t in tournaments:
        creator = db.query(User).filter(User.id == t.created_by).first()
        result.append(MyTournamentOut(
            id=t.id,
            name=t.name,
            game=t.game,
            niveau=t.niveau,
            start_time=t.start_time,
            duration_minutes=t.duration_minutes,
            max_players=t.max_players,
            description=t.description,
            created_at=t.created_at,
            created_by_username=creator.username if creator else "Unbekannt"
        ))
    return result


@tournament_router.get("/created-by-me", response_model=List[MyTournamentOut])
def get_tournaments_created_by_me(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    tournaments = (
        db.query(Tournament)
        .filter(Tournament.created_by == current_user.id)
        .order_by(Tournament.start_time.asc())
        .all()
    )

    result = []
    for t in tournaments:
        result.append(MyTournamentOut(
            id=t.id,
            name=t.name,
            game=t.game,
            niveau=t.niveau,
            start_time=t.start_time,
            duration_minutes=t.duration_minutes,
            max_players=t.max_players,
            description=t.description,
            created_at=t.created_at,
            created_by_username=current_user.username
        ))
    return result


@tournament_router.post("/{tournament_id}/join")
def join_tournament(
    tournament_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    tournament = db.query(Tournament).filter(Tournament.id == tournament_id).first()

    if not tournament:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Turnier wurde nicht gefunden."
        )

    # 🕒 Zeitcheck: Beitritt nur vor Start
    now = datetime.now(timezone.utc)
    if tournament.start_time <= now:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Das Turnier hat bereits begonnen."
        )

    # 🧍‍♂️ Duplikatscheck: User ist schon Teilnehmer
    already_joined = db.query(TournamentParticipant).filter_by(
        tournament_id=tournament_id,
        user_id=current_user.id
    ).first()

    if already_joined:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Du nimmst bereits an diesem Turnier teil."
        )

    # 👥 Max-Teilnehmer prüfen
    participant_count = db.query(TournamentParticipant).filter_by(
        tournament_id=tournament_id
    ).count()

    if participant_count >= tournament.max_players:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Maximale Teilnehmerzahl erreicht."
        )

    # 🎫 Teilnahme speichern
    join_entry = TournamentParticipant(
        tournament_id=tournament_id,
        user_id=current_user.id
    )

    db.add(join_entry)
    db.commit()

    return {"message": "Du hast dich erfolgreich für das Turnier angemeldet."}


@tournament_router.get("/", response_model=List[MyTournamentOut])
def get_all_tournaments(
    current_user: User = Depends(get_current_user),  # 🔒 nur eingeloggte Nutzer
    db: Session = Depends(get_db)
):
    tournaments = (
        db.query(Tournament)
        .order_by(Tournament.start_time.asc())
        .all()
    )

    result = []
    for t in tournaments:
        creator = db.query(User).filter(User.id == t.created_by).first()
        result.append(MyTournamentOut(
            id=t.id,
            name=t.name,
            game=t.game,
            niveau=t.niveau,
            start_time=t.start_time,
            duration_minutes=t.duration_minutes,
            max_players=t.max_players,
            description=t.description,
            created_at=t.created_at,
            created_by_username=creator.username if creator else "Unbekannt"
        ))

    return result

@tournament_router.get("/{tournament_id}", response_model=MyTournamentOut)
def get_tournament_by_id(
    tournament_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    tournament = db.query(Tournament).filter_by(id=tournament_id).first()
    if not tournament:
        raise HTTPException(status_code=404, detail="Turnier nicht gefunden")

    creator = db.query(User).filter(User.id == tournament.created_by).first()

    return MyTournamentOut(
        id=tournament.id,
        name=tournament.name,
        game=tournament.game,
        niveau=tournament.niveau,
        start_time=tournament.start_time,
        duration_minutes=tournament.duration_minutes,
        max_players=tournament.max_players,
        description=tournament.description,
        created_at=tournament.created_at,
        created_by_username=creator.username if creator else "Unbekannt"
    )

@tournament_router.get("/{tournament_id}/participants", response_model=List[ParticipantOut])
def get_participants(
    tournament_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    tournament = db.query(Tournament).filter(Tournament.id == tournament_id).first()
    if not tournament:
        raise HTTPException(status_code=404, detail="Turnier nicht gefunden")

    is_creator = tournament.created_by == current_user.id
    is_admin = current_user.role == "Admin"
    is_participant = db.query(TournamentParticipant).filter_by(
        tournament_id=tournament_id,
        user_id=current_user.id
    ).first() is not None

    if not (is_creator or is_participant or is_admin):
        raise HTTPException(
            status_code=403,
            detail="Du darfst die Teilnehmerliste nicht einsehen"
        )

    # Alle Teilnehmer inkl. Benutzernamen
    participants = (
        db.query(TournamentParticipant.user_id, User.username, TournamentParticipant.joined_at)
        .join(User, User.id == TournamentParticipant.user_id)
        .filter(TournamentParticipant.tournament_id == tournament_id)
        .order_by(User.username.asc())  # 🔠 alphabetisch sortiert
        .all()
    )

    # Format für Response
    return [
        ParticipantOut(
            user_id=p.user_id,
            username=p.username,
            joined_at=p.joined_at
        ) for p in participants
    ]


@tournament_router.post("/{tournament_id}/leave")
def leave_tournament(
    tournament_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Ist der User überhaupt eingetragen?
    entry = db.query(TournamentParticipant).filter_by(
        tournament_id=tournament_id,
        user_id=current_user.id
    ).first()

    if not entry:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Du nimmst an diesem Turnier nicht teil."
        )

    # Ist der User der Ersteller? (der darf schon leaven, aber wir löschen dann NICHT das Turnier)
    tournament = db.query(Tournament).filter_by(id=tournament_id).first()
    if not tournament:
        raise HTTPException(status_code=404, detail="Turnier nicht gefunden")

    # Lösche nur Teilnahme, nicht Turnier selbst
    db.delete(entry)
    db.commit()

    return {"message": "Du hast das Turnier verlassen."}

@tournament_router.delete("/{tournament_id}")
def delete_tournament(
    tournament_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    tournament = db.query(Tournament).filter_by(id=tournament_id).first()
    if not tournament:
        raise HTTPException(status_code=404, detail="Turnier nicht gefunden")

    is_creator = tournament.created_by == current_user.id
    is_admin = current_user.role == "Admin"

    if not (is_creator or is_admin):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Du darfst dieses Turnier nicht löschen"
        )

    db.delete(tournament)
    db.commit()

    return {"message": "Turnier wurde erfolgreich gelöscht."}

@tournament_router.delete("/{tournament_id}/participants/{user_id}")
def remove_participant(
    tournament_id: UUID,
    user_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    tournament = db.query(Tournament).filter_by(id=tournament_id).first()
    if not tournament:
        raise HTTPException(status_code=404, detail="Turnier nicht gefunden")

    # Nur Ersteller oder Admin dürfen löschen
    is_creator = tournament.created_by == current_user.id
    is_admin = current_user.role == "Admin"

    if not (is_creator or is_admin):
        raise HTTPException(
            status_code=403,
            detail="Du darfst keine Teilnehmer entfernen"
        )

    # Teilnahme prüfen
    participation = db.query(TournamentParticipant).filter_by(
        tournament_id=tournament_id,
        user_id=user_id
    ).first()

    if not participation:
        raise HTTPException(
            status_code=404,
            detail="Der Benutzer ist kein Teilnehmer dieses Turniers"
        )
    
    if user_id == tournament.created_by:
        raise HTTPException(
            status_code=403,
            detail="Der Ersteller eines Turniers kann nicht als Teilnehmer entfernt werden"
    )

    db.delete(participation)
    db.commit()

    return {"message": "Teilnehmer wurde entfernt."}
