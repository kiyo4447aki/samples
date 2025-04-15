from pydantic import BaseModel

class REQUEST_BASE(BaseModel):
    user: str
    password: str
    client_id: str