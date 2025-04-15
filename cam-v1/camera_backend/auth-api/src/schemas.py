from pydantic import BaseModel, ConfigDict
from datetime import datetime

class REQUEST_BASE(BaseModel):
    camera_id: str
    password: str
    client_id: str

class GET_KEY_REQUEST(REQUEST_BASE):
    pass

class GET_KEY_RESPONSE(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    status: str
    signaling_key: str

class AUTH_REQUEST(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    clientId: str
    roomId: str
    signalingKey: str | None = None
    

class AUTH_RESPONSE(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    allowed: bool
    reason: str | None = None
    iceServers: list | None = None
    

class CAMERA_BASE(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    camera_id: str
    password: str
    signaling_key: str
    authadmin: str | None = None
    
class RECS_LIST_REQUEST(REQUEST_BASE):
    pass
    
class PLAY_RECS_REQUEST(REQUEST_BASE):
    video_id: str

