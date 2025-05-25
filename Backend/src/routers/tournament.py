from fastapi import APIRouter, Depends, HTTPException, status
from typing import Optional
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime, timezone, timedelta
from itertools import combinations

from models.tournament_data import Tournament
from models.tournament_participant import TournamentParticipant
from models.tournament_team import TournamentTeam
from models.tournament_results import TournamentResult
from models.tournament_matches import TournamentMatch
from models.tournament_prize import TournamentPrize
from models.user import User
from utils.auth_dependencies import get_current_user, get_db
from pydantic import BaseModel, constr, field_validator
from typing import Annotated, List
from typing import Optional
from sqlalchemy import func

tournament_router = APIRouter(
    prefix="/tournaments",
    tags=["Tournaments"]
)

class PrizeSchema(BaseModel):
    place: int
    name: str
    description: Optional[str] = None

# 📥 Request Body für Turniererstellung
class TournamentCreate(BaseModel):
    # Basisdaten
    name: Annotated[str, constr(min_length=3, max_length=100)]
    game: str
    niveau: str
    description: Optional[str] = ""

    # Zeitplan
    start_time: datetime
    duration_minutes: int
    break_duration: Optional[int] = 0
    timezone: Optional[str] = "CET"

    # Registrierung
    registration_start: datetime
    registration_end: datetime
    check_in_required: bool = False

    # Format & Teams
    teamanzahl: int
    teamgroeße: int
    mode: Optional[str] = "singleElimination"  # z. B. singleElimination, roundRobin, groupPhase
    scoring_system: Optional[str] = "STANDARD"
    rules: Optional[str] = ""

    # Teilnahme
    entry_fee: Optional[float] = 0.0
    is_public: bool = True
    invite_only: bool = False

    # Preise
    prizes: Optional[List[PrizeSchema]] = []


    @field_validator("start_time")
    @classmethod
    def validate_start_time(cls, value: datetime) -> datetime:
        now = datetime.now(timezone.utc)
        if value < now:
            raise ValueError("Startzeitpunkt darf nicht in der Vergangenheit liegen.")
        return value

class MatchOut(BaseModel):
    id: UUID
    team_a_name: str
    team_b_name: str
    is_played: bool
    played_at: Optional[datetime]
    winner_team_id: Optional[UUID]
    matchday: int

    class Config:
        from_attributes = True

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

class MatchResultIn(BaseModel):
    winner_team_id: Optional[UUID] = None  # ⬅️ Wenn None, ist es ein Unentschieden

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
    participants_count: Optional[int] = 0

    class Config:
        from_attributes = True  # Pydantic v2


class JoinTournamentRequest(BaseModel):
    team_id: UUID

class TournamentDetailOut(MyTournamentOut):
    teamanzahl: int
    teamgroeße: int
    participants_count: int


###################Ab hier Router##################################################################################

from models.tournament_results import TournamentResult

@tournament_router.post("/create")
def create_tournament(
    tournament_data: TournamentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "Admin":
        raise HTTPException(status_code=403, detail="Nur Admins dürfen Turniere erstellen.")

    tournament = Tournament(
        name=tournament_data.name,
        game=tournament_data.game,
        niveau=tournament_data.niveau,
        start_time=tournament_data.start_time,
        duration_minutes=tournament_data.duration_minutes,
        max_players=tournament_data.teamanzahl * tournament_data.teamgroeße,
        description=tournament_data.description,
        teamanzahl=tournament_data.teamanzahl,
        teamgroeße=tournament_data.teamgroeße,
        created_by=current_user.id,

        # ✅ Neue Felder
        entry_fee=tournament_data.entry_fee,
        timezone=tournament_data.timezone,
        rules=tournament_data.rules,
        scoring_system=tournament_data.scoring_system,
        mode=tournament_data.mode,
        check_in_required=tournament_data.check_in_required,
        registration_start=tournament_data.registration_start,
        registration_end=tournament_data.registration_end,
        is_public=tournament_data.is_public,
        invite_only=tournament_data.invite_only,
    )
    db.add(tournament)
    db.commit()
    db.refresh(tournament)

    # 🎁 Preise hinzufügen
    for prize in tournament_data.prizes:
        db_prize = TournamentPrize(
            tournament_id=tournament.id,
            place=prize.place,
            name=prize.name,
            description=prize.description
        )
        db.add(db_prize)
    db.commit()


    # Teams erstellen
    team_objs = []
    for i in range(1, tournament.teamanzahl + 1):
        team = TournamentTeam(
            tournament_id=tournament.id,
            name=f"Team {i}"
        )
        db.add(team)
        team_objs.append(team)

    db.commit()

    # 🧠 Dynamische Matchgenerierung basierend auf dem Modus
    mode = tournament_data.mode
    teams = team_objs
    matchday = 1

    if mode == "singleElimination":
        from math import log2, ceil
        total_rounds = ceil(log2(len(teams)))
        current_round_teams = teams

        for round_num in range(1, total_rounds + 1):
            num_matches = len(current_round_teams) // 2
            for i in range(num_matches):
                if round_num == 1:
                    # Erste Runde – bekannte Teams
                    team_a = current_round_teams[i * 2]
                    team_b = current_round_teams[i * 2 + 1]
                    db.add(TournamentMatch(
                        tournament_id=tournament.id,
                        team_a_id=team_a.id,
                        team_b_id=team_b.id,
                        matchday=round_num
                    ))
                else:
                    # Spätere Runden – unbekannte Teams
                    db.add(TournamentMatch(
                        tournament_id=tournament.id,
                        team_a_id=None,
                        team_b_id=None,
                        matchday=round_num
                    ))
            current_round_teams = [None] * num_matches  # Platzhalter


    elif mode == "roundRobin":
        # Jeder gegen jeden
        from itertools import combinations
        pairs = list(combinations(teams, 2))
        matches_per_day = len(teams) // 2 or 1
        for i, (team_a, team_b) in enumerate(pairs):
            if i != 0 and i % matches_per_day == 0:
                matchday += 1
            db.add(TournamentMatch(
                tournament_id=tournament.id,
                team_a_id=team_a.id,
                team_b_id=team_b.id,
                matchday=matchday
            ))

    elif mode == "groupPhase":
        group_size = 4
        groups = [teams[i:i + group_size] for i in range(0, len(teams), group_size)]

        for group in groups:
            group_pairs = list(combinations(group, 2))
            for team_a, team_b in group_pairs:
                db.add(TournamentMatch(
                    tournament_id=tournament.id,
                    team_a_id=team_a.id,
                    team_b_id=team_b.id,
                    matchday=matchday
                ))
            matchday += 1



    db.commit()

    return {

        "message": "Turnier inkl. Teams und Spielplan erfolgreich erstellt.",
        "tournament_id": str(tournament.id),
        "matches": db.query(TournamentMatch).filter_by(tournament_id=tournament.id).count(),
        "teams": len(team_objs),
        "prizes": len(tournament_data.prizes),
        "mode": tournament.mode

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
    join_data: Optional[JoinTournamentRequest] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    tournament = db.query(Tournament).filter(Tournament.id == tournament_id).first()
    if not tournament:
        raise HTTPException(status_code=404, detail="Turnier nicht gefunden")

    # 🔁 Wenn kein Team übergeben wurde, automatisch eins finden
    if join_data is None or join_data.team_id is None:
        teams = db.query(TournamentTeam).filter_by(tournament_id=tournament.id).all()
        assigned_team = None
        for team in teams:
            member_count = db.query(TournamentParticipant).filter_by(team_id=team.id).count()
            if member_count < tournament.teamgroeße:
                assigned_team = team
                break

        if not assigned_team:
            raise HTTPException(status_code=400, detail="Kein verfügbares Team gefunden.")

        join_data = JoinTournamentRequest(team_id=assigned_team.id)

    # 🕓 Zeitprüfung
    if tournament.start_time <= datetime.now(timezone.utc):
        raise HTTPException(status_code=403, detail="Das Turnier hat bereits begonnen.")

    # 🔒 Bereits beigetreten?
    already_joined = db.query(TournamentParticipant).filter_by(
        tournament_id=tournament_id,
        user_id=current_user.id
    ).first()
    if already_joined:
        raise HTTPException(status_code=400, detail="Du bist bereits Teilnehmer.")

    # 📈 Turnier voll?
    total_participants = db.query(TournamentParticipant).filter_by(
        tournament_id=tournament_id
    ).count()
    if total_participants >= tournament.max_players:
        raise HTTPException(status_code=403, detail="Das Turnier ist bereits voll.")

    # ✅ Team prüfen
    team = db.query(TournamentTeam).filter_by(id=join_data.team_id, tournament_id=tournament_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team nicht gefunden.")

    member_count = db.query(TournamentParticipant).filter_by(team_id=team.id).count()
    if member_count >= tournament.teamgroeße:
        raise HTTPException(status_code=403, detail="Das gewählte Team ist bereits voll.")

    # ✅ Teilnahme speichern
    entry = TournamentParticipant(
        tournament_id=tournament_id,
        user_id=current_user.id,
        team_id=team.id
    )
    db.add(entry)
    db.commit()

    return {"message": f"Du bist dem Team '{team.name}' erfolgreich beigetreten."}

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
        participants_count = db.query(TournamentParticipant).filter(TournamentParticipant.tournament_id == t.id).count()
        
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
            created_by_username=creator.username if creator else "Unbekannt",
            participants_count=participants_count
        ))

    return result

@tournament_router.get("/{tournament_id}", response_model=TournamentDetailOut)
def get_tournament_by_id(
    tournament_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    tournament = db.query(Tournament).filter_by(id=tournament_id).first()
    if not tournament:
        raise HTTPException(status_code=404, detail="Turnier nicht gefunden")

    creator = db.query(User).filter(User.id == tournament.created_by).first()
    participants_count = db.query(TournamentParticipant).filter_by(tournament_id=tournament_id).count()

    return TournamentDetailOut(
        id=tournament.id,
        name=tournament.name,
        game=tournament.game,
        niveau=tournament.niveau,
        start_time=tournament.start_time,
        duration_minutes=tournament.duration_minutes,
        max_players=tournament.max_players,
        description=tournament.description,
        created_at=tournament.created_at,
        created_by_username=creator.username if creator else "Unbekannt",
        teamanzahl=tournament.teamanzahl,
        teamgroeße=tournament.teamgroeße,
        participants_count=participants_count
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

@tournament_router.post("/{tournament_id}/matches/{match_id}/result")
def set_match_result(
    tournament_id: UUID,
    match_id: UUID,
    result_data: MatchResultIn,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # 🔐 Nur Admins erlaubt
    if current_user.role != "Admin":
        raise HTTPException(status_code=403, detail="Nur Admins dürfen Ergebnisse eintragen.")

    # 🔎 Match holen
    match = db.query(TournamentMatch).filter_by(id=match_id, tournament_id=tournament_id).first()
    if not match:
        raise HTTPException(status_code=404, detail="Match nicht gefunden.")
    
    if match.played:
        raise HTTPException(status_code=400, detail="Dieses Match wurde bereits gewertet.")

    # 🔢 Punktevergabe vorbereiten
    team_a = db.query(TournamentTeam).filter_by(id=match.team_a_id).first()
    team_b = db.query(TournamentTeam).filter_by(id=match.team_b_id).first()

    if not team_a or not team_b:
        raise HTTPException(status_code=404, detail="Mindestens ein Team nicht gefunden.")

    if result_data.winner_team_id is None:
        # 🟡 Unentschieden
        team_a.points += 1
        team_b.points += 1
    elif result_data.winner_team_id == team_a.id:
        team_a.points += 3
    elif result_data.winner_team_id == team_b.id:
        team_b.points += 3
    else:
        raise HTTPException(status_code=400, detail="Sieger-Team gehört nicht zu diesem Match.")

    # 🎯 Matches gezählt
    team_a.matches_played += 1
    team_b.matches_played += 1

    # ✅ Ergebnis speichern
    matches_played = True
    match.played_at = datetime.now(timezone.utc)
    match.winner_team_id = result_data.winner_team_id

    db.commit()

    return {"message": "Ergebnis wurde erfolgreich eingetragen."}

@tournament_router.get("/{tournament_id}/matches", response_model=List[MatchOut])
def get_tournament_matches(
    tournament_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    tournament = db.query(Tournament).filter_by(id=tournament_id).first()
    if not tournament:
        raise HTTPException(status_code=404, detail="Turnier nicht gefunden.")

    # Alle Matches holen
    matches = db.query(TournamentMatch).filter_by(tournament_id=tournament_id).order_by(TournamentMatch.matchday.asc()).all()

    result = []
    for match in matches:
        team_a = db.query(TournamentTeam).filter_by(id=match.team_a_id).first()
        team_b = db.query(TournamentTeam).filter_by(id=match.team_b_id).first()

        result.append(MatchOut(
            id=match.id,
            team_a_name=team_a.name if team_a else "Unbekannt",
            team_b_name=team_b.name if team_b else "Unbekannt",
            is_played=match.played,
            played_at=match.played_at,
            winner_team_id=match.winner_team_id,
            matchday=match.matchday
        ))

    return result

@tournament_router.get("/stats/popular_games")
def get_popular_games(db: Session = Depends(get_db)):
    three_months_ago = datetime.utcnow() - timedelta(days=90)
    result = (
        db.query(Tournament.game, func.count(Tournament.id).label("count"))
        .filter(Tournament.created_at >= three_months_ago)
        .group_by(Tournament.game)
        .order_by(func.count(Tournament.id).desc())
        .limit(3)
        .all()
    )

    return [{"name": r[0], "count": r[1]} for r in result]