from pydantic import BaseModel, ConfigDict
from datetime import datetime

class NEW_RESERVE_BASE(BaseModel):
    shop_id: str
    email: str
    date: str | datetime
    name: str
    tel: str
    request: str | None = None
    visited: bool
    model_config = ConfigDict(from_attributes=True)
    
class SELECT_RESERVE_BASE(NEW_RESERVE_BASE):
    reserve_id: str
    created_at: datetime
    updated_at: datetime
    
    
class UPDATE_RESERVE_BASE(NEW_RESERVE_BASE):
    reserve_id: str