from pydantic import BaseModel,ConfigDict
from datetime import datetime, time
from typing import Union

class SHOP(BaseModel):
    email: str
    name: Union[str, None] = None
    address: Union[str, None] = None
    tel: Union[str, None] = None
    opening_time: Union[time, None] = None
    closing_time: Union[time, None] = None
    start_time: Union[time, None] = None
    end_time: Union[time, None] = None
    change_accept: Union[int, None] = None
    sameday_reserve:  Union[bool, None] = None
    model_config = ConfigDict(from_attributes=True)

class CREATE_SHOP_BASE(BaseModel):
    email: str
    password: str

class SELECT_SHOP_BASE(SHOP):
    shop_id: str
    created_at: datetime
    updated_at: datetime

class UPDATE_SHOP_BASE(SHOP):
    shop_id: str

class SHOP_IN_DB(SELECT_SHOP_BASE):
    hashed_password: str
    notification_token: Union[str, None] = None
    
