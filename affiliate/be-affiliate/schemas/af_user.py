from pydantic import BaseModel, ConfigDict
from datetime import datetime

class AF_USER(BaseModel):
    name: str
    account: str
    email: str
    model_config = ConfigDict(from_attributes=True)

class CREATE_AF_USER_BASE(AF_USER):
    password: str
    
class SELECT_AF_USER_BASE(AF_USER):
    af_id: str
    created_at: datetime
    updated_at: datetime
    
class UPDATE_AF_USER_BASE(AF_USER):
    af_id: str
    
class AF_USER_IN_DB(SELECT_AF_USER_BASE):
    hashed_password: str


    