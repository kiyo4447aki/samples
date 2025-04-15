from fastapi import APIRouter, Request
import sys
sys.path.append("../")
from handle_db import af_user_db
from errors.exceptions import WrongNameException, CreateFailedException, DeleteFailedException, UpdateFailedException, AccessForbiddenException
from schemas.af_user import SELECT_AF_USER_BASE, CREATE_AF_USER_BASE, UPDATE_AF_USER_BASE
from utils.user_id import create_af_id
from fastapi.responses import JSONResponse
from auth.auth import get_hashed_password

#auth
from auth.auth_af_user import get_current_af_user
from fastapi import Depends

router = APIRouter()

#管理者のみアクセス可
@router.get(path="/af_users")
async def get_all_af_user():
    result = af_user_db.select_all()
    return {
        "status" : "OK",
        "data" : result
    }
    
@router.get(path="/af_user/{af_id}")
async def get_af_user(af_id: str,current_user: SELECT_AF_USER_BASE = Depends(get_current_af_user)):
    if af_id != current_user.af_id:
        raise AccessForbiddenException(id=af_id)
    try:
        user = af_user_db.select(af_id)
    except:
        raise WrongNameException(name=af_id)
    if user == 1:
        raise WrongNameException(name=af_id)
    return {
        "status" : "success",
        "user" : SELECT_AF_USER_BASE.model_validate(user)
    }
    

@router.post(path="/af_user/create")
async def create_af_user(user: CREATE_AF_USER_BASE):
    new_user = {
        "af_id": create_af_id() ,
        "name": user.name,
        "account": user.account,
        "email": user.email,
        "hashed_password": get_hashed_password(user.password)
        #"banking": user.banking
    }
    try:
        result = af_user_db.create(new_user)
    except:
        raise CreateFailedException(data=user)
    if result == 0:
        return {"status" : "success",}
    else:
        raise CreateFailedException(data=user)

@router.delete(path="/af_user/{af_id}")
async def delete_af_user(af_id: str, current_user: SELECT_AF_USER_BASE = Depends(get_current_af_user)):
    if af_id != current_user.af_id:
        raise AccessForbiddenException(id=af_id)
    try:
        result = af_user_db.delete(af_id)
    except:
        raise DeleteFailedException(id=af_id)
    if result == 0:
        return {"status" : "success",}
    else:
        raise DeleteFailedException(id=af_id)
    
@router.put(path="/af_user/{af_id}")
async def update_af_user(data: UPDATE_AF_USER_BASE, current_user: SELECT_AF_USER_BASE = Depends(get_current_af_user)):
    if data.af_id != current_user.af_id:
        raise AccessForbiddenException(id=data.af_id)
    try:
        result = af_user_db.update(data)
    except:
        raise UpdateFailedException(id=data.af_id)
    if result == 0:
        return {"status": "success"}
    else:
        raise UpdateFailedException(id=data.af_id)
    


