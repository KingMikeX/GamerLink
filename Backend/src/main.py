from fastapi import FastAPI
from routers.auth import auth_router
from routers.profile import profile_router
from routers.tournament import tournament_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(tournament_router)