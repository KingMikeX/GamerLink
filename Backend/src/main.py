from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from routers.auth import auth_router
from routers.profile import profile_router
from routers.tournament import tournament_router
from utils.last_seen_middleware import UpdateLastSeenMiddleware

app = FastAPI()

# ✅ CORS aktivieren – damit Login & API vom Frontend funktionieren
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Dein Next.js-Frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🧠 Custom Middleware für "Zuletzt online"
app.add_middleware(UpdateLastSeenMiddleware)

# 🔗 API-Router einbinden
app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(tournament_router)

# 📁 Profilbilder-Upload-Ordner
uploads_dir = os.path.join(os.path.dirname(__file__), "uploads", "profile_pictures")
app.mount(
    "/static/profile_pictures",
    StaticFiles(directory=uploads_dir),
    name="profile_pictures"
)
