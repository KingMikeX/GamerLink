from db.database import Base, engine
from models.user import User
from models.user_profile import UserProfile
from models.tournament_data import Tournament
from models.tournament_participant import TournamentParticipant


# Tabellen in der Datenbank erstellen
print("🛠️ Erstelle Tabellen...")
Base.metadata.create_all(bind=engine)
print("✅ Tabellen wurden erstellt.")