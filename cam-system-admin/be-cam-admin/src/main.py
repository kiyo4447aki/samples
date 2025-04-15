from fastapi import FastAPI, Depends
from .auth import verify_credentials, auth_router
from .janus_client import list_rooms, list_participants

app = FastAPI(title="Janus防犯カメラ管理システム API", version="1.0")

app.include_router(auth_router)

@app.get("/api/rooms", dependencies=[Depends(verify_credentials)])
def get_rooms():
    """
    Janus上のルーム一覧を取得するエンドポイント
    """
    try:
        rooms = list_rooms()
        return rooms
    except Exception as e:
        # エラー発生時は 500 を返す
        return {"error": str(e)}

@app.get("/api/rooms/{room_id}/participants", dependencies=[Depends(verify_credentials)])
def get_participants(room_id: int):
    """
    指定したルームIDの参加者一覧を取得するエンドポイント
    """
    try:
        participants = list_participants(room_id)
        return {"room": room_id, "participants": participants}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
