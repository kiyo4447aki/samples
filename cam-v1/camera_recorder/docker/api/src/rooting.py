from fastapi import APIRouter, HTTPException, Header, BackgroundTasks, Query
from fastapi.responses import JSONResponse, StreamingResponse
from auth.auth import is_correct_password, get_hashed_password
import os
from functions.record import get_record_info
from schemas import REQUEST_BASE
from datetime import datetime, timedelta
import secrets
from auth.token import video_tokens, TOKEN_EXPIRATION_SECONDS, cleanup_expired_tokens

router = APIRouter()
rec_path = "/record"
buffer_size = 4 * 1024 * 1024

camera_id = ""


@router.post("/records")
async def get_record_list(req: REQUEST_BASE):
    if not is_correct_password(camera_id, req.password):
        raise HTTPException(status_code=401, detail="failed auth")
    files = os.listdir(rec_path)
    result = [get_record_info(f) for f in files]
    
    return JSONResponse(status_code=200, content=result)

@router.get("/video-token/")
async def get_video_token(record_name: str, background_tasks: BackgroundTasks, authorization:str = Header(...)):
    if not is_correct_password(camera_id, authorization):
        raise HTTPException(status_code=401, detail="failed auth")
        
    token = secrets.token_urlsafe(16)
    expires_at = datetime.now() + timedelta(seconds=TOKEN_EXPIRATION_SECONDS)  
    video_tokens[token] = {"record_name": record_name, "expires_at": expires_at}
    
    background_tasks.add_task(cleanup_expired_tokens)

    return {"token": token, "expires_at": expires_at.isoformat()}

@router.get("/view/{file_name}")
async def get_video(file_name: str, token: str = Query(None), range: str = Header(...)):
    if not token or token not in video_tokens:
        raise HTTPException(status_code=403, detail="Invalid token")

    token_data = video_tokens[token]
    
    if datetime.now() > token_data["expires_at"]:
        del video_tokens[token]  
        raise HTTPException(status_code=403, detail="Token expired")

    if token_data["record_name"] != file_name:
        raise HTTPException(status_code=403, detail="Invalid token for this video")
    
    file_path = os.path.join(rec_path, file_name)

    file_size = os.path.getsize(file_path)

    start_byte = 0
    end_byte = file_size - 1

    if range:
        range_values = range.replace("bytes=", "").split("-")
    
        start_byte = int(range_values[0]) if range_values[0] else 0  

        if range_values[1]:
            end_byte = int(range_values[1])
        elif file_size - start_byte > buffer_size:
            end_byte = start_byte + buffer_size
        else:
            end_byte = file_size - 1
            

        headers = {
            "Content-Range": f"bytes {start_byte}-{end_byte}/{file_size}",
            "Accept-Ranges": "bytes",
            "Content-Length": str(end_byte - start_byte + 1),
            "Content-Type": "video/mp4"
            
        }

        def video_streamer():
            with open(file_path, "rb") as video_file:
                video_file.seek(start_byte)
                yield video_file.read(end_byte - start_byte + 1)
        
    return StreamingResponse(video_streamer(), status_code=206, headers=headers)
