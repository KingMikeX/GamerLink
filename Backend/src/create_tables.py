from db.database import Base, engine
from models.user import User
from models.user_profile import UserProfile
from models.tournament_data import Tournament
from models.tournament_participant import TournamentParticipant
from models.tournament_team import TournamentTeam
from models.tournament_matches import TournamentMatch
from models.tournament_results import TournamentResult
from models.tournament_prize import TournamentPrize
from models.friendship import  Friendship

# Nur für Entwicklungsumgebungen: Löscht alle Tabellen und erstellt sie neu
#print("⚠️ Lösche bestehende Tabellen...")
#Base.metadata.drop_all(bind=engine)

print("🛠️ Erstelle Tabellen...")
Base.metadata.create_all(bind=engine)

print("✅ Tabellen wurden neu erstellt.")
