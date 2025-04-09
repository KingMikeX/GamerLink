from sqlalchemy import Column, String, TIMESTAMP, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID, ARRAY
import uuid
from sqlalchemy import text
from db.database import Base

class UserProfile(Base):
    __tablename__ = "user_profile"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    favorite_games = Column(ARRAY(Text))  # z.B. ['Valorant', 'LoL']
    main_game = Column(String(100))
    rank = Column(String(50))
    play_style = Column(String(100))      # z.B. "Taktisch", "Support"
    platform = Column(String(50))         # z.B. "PC", "PS5"
    region = Column(String(50))           # z.B. "EUW", "NA"
    bio = Column(Text)
    created_at = Column(TIMESTAMP, server_default=text("NOW()"))