from db.database import Base, engine
from models.user import User
from models.user_profile import UserProfile

# Tabellen in der Datenbank erstellen
print("🛠️ Erstelle Tabellen...")
Base.metadata.create_all(bind=engine)
print("✅ Tabellen wurden erstellt.")