import sys
sys.path.append("../")
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends, APIRouter
from .models import Token, TokenData
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from schemas.shop import SHOP_IN_DB
from errors.exceptions import WrongNameException, AuthException

from .auth import SECRET_KEY, ALGORITHM,is_correct_password,oauth2_scheme

from handle_db import shop_db



def authenticate_shop(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not is_correct_password(password, user.hashed_password):
        return False
    return  user

def create_shop_token(data: dict, expires_delta: timedelta|None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwd = jwt.encode(to_encode, SECRET_KEY,algorithm=ALGORITHM)
    return encoded_jwd


def get_user(email: str):
    shop = shop_db.select_from_email(email)
    if shop == 1:
        raise WrongNameException(name=email)
    return SHOP_IN_DB.model_validate(shop)
    
async def get_current_shop(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token,SECRET_KEY, algorithms=ALGORITHM)
        username = payload.get("sub")
        if username is None:
            raise AuthException(detail="JWTのsubキーからユーザーが取得できません")
        token_data = TokenData(username=username)
    except JWTError:
        raise AuthException(detail="JWTエラー")
    user = get_user(token_data.username)
    if user is None:
        raise AuthException(detail="auth_shop.py/get_user関数内でエラーが発生しました")
    return user


