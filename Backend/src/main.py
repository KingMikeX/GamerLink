from fastapi import FastAPI 
from utils.last_seen_middleware import UpdateLastSeenMiddleware
from fastapi.staticfiles import StaticFiles
import os
from routers.auth import auth_router
from routers.profile import profile_router
from routers.tournament import tournament_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(tournament_router)

uploads_dir = os.path.join(os.path.dirname(__file__), "uploads", "profile_pictures")
app.mount(
    "/static/profile_pictures",
    StaticFiles(directory=uploads_dir),
    name="profile_pictures"
)

app.add_middleware(UpdateLastSeenMiddleware)