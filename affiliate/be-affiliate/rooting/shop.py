from fastapi import APIRouter, Request, Depends
import sys
sys.path.append("../")
from handle_db import shop_db
from errors.exceptions import WrongNameException, CreateFailedException, DeleteFailedException, UpdateFailedException, AccessForbiddenException
from schemas.shop import * 
from utils.user_id import create_shop_id
from fastapi.responses import JSONResponse
from auth.auth import get_hashed_password
from notification.token import register_shop_notification
from schemas.common import NOTIFICATION_TOKEN

from auth.auth_shop import get_current_shop

router = APIRouter()

#管理者のみアクセス可
@router.get(path="/shops")
async def get_all_af_shop():
    result = shop_db.select_all()
    return {
        "status" : "OK",
        "data" : result
    }
    
@router.get(path="/shop/{shop_id}")
async def get_af_shop(shop_id: str, current_user: SELECT_SHOP_BASE = Depends(get_current_shop)):
    if shop_id != current_user.shop_id:
        raise AccessForbiddenException(id=shop_id)
    shop = shop_db.select(shop_id)
    if shop == 1:
        raise WrongNameException(name=shop_id)
    return {
        "status" : "success",
        "user" : SELECT_SHOP_BASE.model_validate(shop)
    }

@router.post(path="/shop/create")
async def create_shop(shop: CREATE_SHOP_BASE):
    new_shop = {
        "shop_id": create_shop_id(),
        "email": shop.email,
        "hashed_password": get_hashed_password(shop.password)
    }
    result = shop_db.create(new_shop)
    
    if result == 0:
        return {"status" : "success",}
    else:
        raise CreateFailedException(data=shop)

@router.delete(path="/shop/{shop_id}")
async def delete_shop(shop_id: str, current_user: SELECT_SHOP_BASE = Depends(get_current_shop)):
    if shop_id != current_user.shop_id:
        raise AccessForbiddenException(id=shop_id)
    result = shop_db.delete(shop_id)
    if result == 0:
        return {"status" : "success",}
    else:
        raise DeleteFailedException(id=shop_id)
    
@router.put(path="/shop/{shop_id}")
async def update_shop(data: UPDATE_SHOP_BASE, current_user: SELECT_SHOP_BASE = Depends(get_current_shop)):
    if data.shop_id != current_user.shop_id:
        raise AccessForbiddenException(id=data.shop_id)
    result = shop_db.update(data)
    if result == 0:
        return {"status": "success"}
    else:
        raise UpdateFailedException(id=data.shop_id)
    
@router.post(path="/shop/register_notify/{shop_id}")
async def register_shop_notification(shop_id: str, data: NOTIFICATION_TOKEN, current_user: SELECT_SHOP_BASE = Depends(get_current_shop)):
    if shop_id != current_user.shop_id:
        raise AccessForbiddenException(id=shop_id)
    result = register_shop_notification(shop_id, NOTIFICATION_TOKEN.token)
    if result == 0:
        return {"status": "success"}
    else:
        raise Exception