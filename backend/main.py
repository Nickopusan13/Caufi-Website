from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routes import home, login, product, user
from app.db.init_db import create_tabel
from contextlib import asynccontextmanager
from starlette.middleware.sessions import SessionMiddleware
from dotenv import load_dotenv
import os

path = "C:/Freelance/Website/my-project/.env"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(dotenv_path=path)

@asynccontextmanager
async def lifespan(app:FastAPI):
    await create_tabel()   
    yield

app = FastAPI(title="Caufi", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SECRET_KEY"),
)
app.mount(
    "/uploads",
    StaticFiles(directory=os.path.join(BASE_DIR, "uploads")),
    name="uploads"
)

app.include_router(home.router)
app.include_router(login.router)
app.include_router(product.router)
app.include_router(user.router)