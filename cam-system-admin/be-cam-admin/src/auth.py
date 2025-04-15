from fastapi import APIRouter, HTTPException, Request, Response, status
from pydantic import BaseModel
import os
import time
from jose import JWTError, jwt
import bcrypt

# 環境変数から各種設定を取得（実運用では必ず環境変数で管理してください）
SECRET_KEY = os.environ.get("SECRET_KEY", "your_secret_key_here")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# 認証に利用するユーザー名とパスワードのハッシュ
ADMIN_USER = os.environ.get("ADMIN_USER", "admin")
ADMIN_PASSWORD_HASH = os.environ.get("ADMIN_PASSWORD_HASH", "$2b$12$RrxfE8IcbhoH8Urfz2pTpuSWOfC7NW1Xm.U0cgOUCvacWEhu3QsyO")

# ユーザーモデル（シンプルな例）
class User(BaseModel):
    username: str

class LoginData(BaseModel):
    username: str
    password: str

auth_router = APIRouter()

async def verify_credentials(request: Request):
    """
    Cookie に設定された access_token（JWT）を検証し、有効な場合はユーザー情報を返します。
    認証に失敗した場合は HTTP 401 を発生させます。
    """
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"}
        )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"}
            )
        return {"username": username}
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"}
        ) from e

def authenticate_user(username: str, password: str):
    """
    渡されたユーザー名およびパスワードと、環境変数で設定された管理者情報を比較します。
    ADMIN_USER と ADMIN_PASSWORD_HASH が一致する場合、認証成功としユーザー情報を返します。
    """
    # ユーザー名の一致を確認
    if username != ADMIN_USER:
        return None
    # 入力されたパスワードが、環境変数にあるハッシュと一致するかチェック
    if bcrypt.checkpw(password.encode('utf-8'), ADMIN_PASSWORD_HASH.encode('utf-8')):
        return {"username": username}
    return None

def create_access_token(data: dict, expires_delta: int = ACCESS_TOKEN_EXPIRE_MINUTES * 60):
    to_encode = data.copy()
    expire = time.time() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@auth_router.post("/api/auth/login")
async def login(login_data: LoginData, response: Response):
    user = authenticate_user(login_data.username, login_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user["username"]})
    # Cookie を HTTPOnly・Secure にセット（HTTPS 環境の場合 secure=True）
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,           # HTTPS を利用する場合に有効、本番環境では True に設定
        samesite="strict",
        path="/"
    )
    return {"username": user["username"], "isAuthenticated": True}

@auth_router.get("/api/auth/me")
async def read_users_me(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"username": username, "isAuthenticated": True}

@auth_router.post("/api/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    return {"msg": "Logged out"}
