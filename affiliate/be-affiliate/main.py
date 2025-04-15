from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from errors.exceptions import *
from errors.middleware import ErrorhandlingMiddleware
from rooting import af_user, shop, reserve
from auth import routes as auth_routes

app = FastAPI()

origins = ["*"]

app.add_middleware(ErrorhandlingMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(af_user.router)
app.include_router(shop.router)
app.include_router(auth_routes.router)
app.include_router(reserve.router)

