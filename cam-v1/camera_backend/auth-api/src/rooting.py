from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from schemas import GET_KEY_REQUEST, GET_KEY_RESPONSE, AUTH_REQUEST, AUTH_RESPONSE, CAMERA_BASE, RECS_LIST_REQUEST, PLAY_RECS_REQUEST
from handle_db import camera_db
from auth.auth import is_correct_password, get_hashed_password
import os
from dotenv import load_dotenv
load_dotenv()

router = APIRouter()
adminpass = os.getenv("adminpass")

@router.post("/get_signaling_key")
async def get_key(req: GET_KEY_REQUEST) -> GET_KEY_RESPONSE:
    try:
        camera = camera_db.select(req.camera_id)
    except:
        raise HTTPException(status_code=404, detail="camera not found")
    if not is_correct_password(req.password, camera.hashed_password):
        raise HTTPException(status_code=401, detail="failed auth")
    return GET_KEY_RESPONSE(
        status="success", 
        signaling_key=camera.signaling_key
        )

@router.post("/auth_password")
async def auth_password (req: GET_KEY_REQUEST) :
    try:
        camera = camera_db.select(req.camera_id)
    except:
        raise HTTPException(status_code=404, detail="camera not found")
    if is_correct_password(req.password, camera.hashed_password):
        return JSONResponse(
            {"auth": "success"},
            status_code=200
        )
    else:
        raise HTTPException(status_code=401, detail="failed auth")
        

@router.post("/auth_client")
async def auth_client(req: AUTH_REQUEST) -> AUTH_RESPONSE:
    try:
        camera = camera_db.select(req.roomId)
    except:
        raise HTTPException(status_code=404, detail="room not found")
    if req.signalingKey != camera.signaling_key:
        return AUTH_RESPONSE(
            allowed=False,
            reason="signalingKey is invalid",
            iceServers=None
        )
    return AUTH_RESPONSE(
        allowed=True,
        reason=None,
        iceServers=[
            {
                "urls": ["stun:162.43.93.144:3478"]
            },
            {
                "urls": ["turn:162.43.93.144:3478"],
                "username": "test",
                "credential": "testpass"
            }
        ]
    )

@router.post("/register_camera")
async def register_camera(req: CAMERA_BASE):
    if not is_correct_password(req.authadmin, adminpass):
        raise HTTPException(status_code=401, detail="failed auth")
    
    new_camera = {
        "camera_id": req.camera_id,
        "hashed_password": get_hashed_password(req.password),
        "signaling_key": req.signaling_key
    }
    try:
        camera_db.create(new_camera)
    except:
        raise HTTPException(status_code=400, detail="failed register camera")
    return {"status": "success"}

