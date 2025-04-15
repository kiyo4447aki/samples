from fastapi import APIRouter, Depends
from handle_db import reserve_db
from schemas.shop import SELECT_SHOP_BASE
from schemas.reserve import *
from auth.auth_shop import get_current_shop
from utils.user_id import create_reserve_id
from errors.exceptions import WrongNameException, CreateFailedException, DeleteFailedException, UpdateFailedException, AccessForbiddenException
router = APIRouter()

#管理者のみアクセス可
@router.get(path="/reserves")
async def get_all_reserve():
    result = reserve_db.select_all()
    return {
        "status" : "OK",
        "data" : result
    }
    
#ショップログイン済ユーザーからアクセス
@router.get(path="/reserves/shop/{shop_id}")
async def get_resrves_from_shop_id(shop_id: str, current_user: SELECT_SHOP_BASE = Depends(get_current_shop)):
    if shop_id != current_user.shop_id:
        raise AccessForbiddenException(id=shop_id)
    reserves = reserve_db.select_from_shop(shop_id)
    return {
        "status" : "success",
        "result" : reserves
    }
    
@router.get(path="/reserve/{reserve_id}")
async def get_reserves_from_id(reserve_id: str):
    reserve = reserve_db.select_from_id(reserve_id)
    if reserve == 1:
        raise WrongNameException(name=reserve_id)
    return {
        "status" : "success",
        "user" : SELECT_RESERVE_BASE.model_validate(reserve)
    }

@router.post(path="/reserve/create")
async def create_reserve(reserve: NEW_RESERVE_BASE):
    new_reserve = {
        "reserve_id": create_reserve_id(),
        "shop_id": reserve.shop_id,
        "email": reserve.email,
        "date": reserve.date,
        "name": reserve.name,
        "tel": reserve.tel,
        "request": reserve.request,
        "visited": reserve.visited
    }
    result = reserve_db.create(new_reserve)
    if result == 0:
        return {"status" : "success",}
    else:
        raise CreateFailedException(data=reserve)

@router.delete(path="/reserve/{reserve_id}")
async def delete_reserve(reserve_id: str):
    result = reserve_db.delete(reserve_id)
    if result == 0:
        return {"status" : "success",}
    else:
        raise DeleteFailedException(id=reserve_id)

@router.put(path="/reserve/reserve_id")
async def update_reserve(data: UPDATE_RESERVE_BASE):
    result = reserve_db.update(data)
    if result == 0:
        return {"status": "success"}
    else:
        raise UpdateFailedException(id=data.reserve_id)