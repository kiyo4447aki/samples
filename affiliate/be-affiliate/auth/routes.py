from fastapi.security import OAuth2PasswordRequestForm
from schemas.af_user import SELECT_AF_USER_BASE
from schemas.shop import SELECT_SHOP_BASE
from fastapi import Depends, APIRouter
from .auth import ACCESS_TOKEN_EXPIRE_MINUTES
from .models import Token
from .auth_af_user import authenticate_af_user, create_af_token, get_current_af_user
from .auth_shop import authenticate_shop, create_shop_token, get_current_shop
from datetime import timedelta
from errors.exceptions import AuthException

router = APIRouter()


@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()) -> Token:
    if form_data.username[0] == "A":
        user = authenticate_af_user(form_data.username, form_data.password)
        if not user:
            raise Exception
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_af_token(
            data={"sub": user.af_id}, expires_delta=access_token_expires
        )
        return Token(access_token=access_token, token_type="bearer")
    else:
        shop = authenticate_shop(form_data.username, form_data.password)
        if not shop:
            raise Exception
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_shop_token(
            data={"sub": shop.email}, expires_delta=access_token_expires
        )
        return Token(access_token=access_token, token_type="bearer")
    

@router.get(path="/current/af_user")
async def get_current_af_user(current_user: SELECT_AF_USER_BASE = Depends(get_current_af_user)):
    return current_user


@router.get(path="/current/shop")
async def get_current_shop(current_user: SELECT_SHOP_BASE = Depends(get_current_shop)):
    return current_user