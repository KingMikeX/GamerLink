from sqlalchemy import Column, String, Integer, TIMESTAMP, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from db.database import Base

class Tournament(Base):
    __tablename__ = "tournaments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String(100), nullable=False)
    game = Column(String(100), nullable=False)
    niveau = Column(String(50), nullable=False)  # z. B. "Anfänger", "Profi"
    start_time = Column(TIMESTAMP(timezone=True), nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    max_players = Column(Integer, nullable=False)
    description = Column(Text)
    teamanzahl = Column(Integer, nullable=False, default=2)
    teamgröße = Column(Integer, nullable=False, default=1)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    
    # Der Admin, der es erstellt hat
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
