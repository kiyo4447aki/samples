import sys
sys.path.append("../")
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends, APIRouter
from .models import Token, TokenData
from schemas.af_user import AF_USER_IN_DB,SELECT_AF_USER_BASE
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from errors.exceptions import AuthException
from .auth import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES,is_correct_password,oauth2_scheme

from handle_db import af_user_db




def authenticate_af_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not is_correct_password(password, user.hashed_password):
        return False
    return  user

def create_af_token(data: dict, expires_delta: timedelta|None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwd = jwt.encode(to_encode, SECRET_KEY,algorithm=ALGORITHM)
    return encoded_jwd


def get_user(userid: str):
    usertype = userid[0]
    if usertype == "A":
        user = af_user_db.select(userid)
        if user == 1:
            raise Exception
        return AF_USER_IN_DB.model_validate(user)
    else:
        raise Exception

    
async def get_current_af_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token,SECRET_KEY, algorithms=ALGORITHM)
        username = payload.get("sub")
        if username is None:
            raise AuthException(detail="JWTのsubキーからユーザーが取得できません")
        token_data = TokenData(username=username)
    except JWTError:
        raise AuthException(detail="JWTエラー")
    user = get_user(userid=token_data.username)
    if user is None:
        raise AuthException(detail="auth_shop.py/get_user関数内でエラーが発生しました")
    return user


