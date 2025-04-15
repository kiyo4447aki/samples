import os
import requests
from dotenv import load_dotenv
import uuid

load_dotenv(override=True)

JANUS_URL = os.environ.get("JANUS_URL", "")
JANUS_ADMIN_KEY = os.environ.get("JANUS_ADMIN_KEY", None)


def generate_transaction():
    return uuid.uuid4().hex

def list_rooms():
    try:
        # 1. セッション作成
        res = requests.post(JANUS_URL, json={
            "janus": "create",
            "transaction": generate_transaction()
        })
        res.raise_for_status()
        json_response = res.json()
        print("Janus create response:", json_response)
        if "data" not in json_response:
            raise Exception("Janus のレスポンスに 'data' キーが存在しません: " + str(json_response))
        session_id = json_response["data"]["id"]

        # 2. プラグインアタッチ
        res = requests.post(f"{JANUS_URL}/{session_id}", json={
            "janus": "attach", 
            "plugin": "janus.plugin.videoroom",
            "transaction": generate_transaction()
        })
        res.raise_for_status()
        handle_id = res.json()["data"]["id"]

        # 3. listリクエスト送信
        body = {"request": "list"}
        if JANUS_ADMIN_KEY:
            body["admin_key"] = JANUS_ADMIN_KEY
        res = requests.post(f"{JANUS_URL}/{session_id}/{handle_id}", json={
            "janus": "message",
            "body": body,
            "transaction": generate_transaction()
        })
        res.raise_for_status()
        data_response = res.json()
        if data_response.get("janus") != "success":
            raise Exception("Janus の list リクエストが失敗しました: " + str(data_response))
        rooms = data_response["plugindata"]["data"].get("list", [])
    except Exception as e:
        raise Exception(f"list_rooms の実行中にエラーが発生しました: {str(e)}")
    finally:
        try:
            # 脱着およびセッション破棄にも transaction を付与
            requests.post(f"{JANUS_URL}/{session_id}/{handle_id}", json={
                "janus": "detach",
                "transaction": generate_transaction()
            })
            requests.post(f"{JANUS_URL}/{session_id}", json={
                "janus": "destroy",
                "transaction": generate_transaction()
            })
        except Exception:
            pass
    return rooms

def list_participants(room_id: int):
    try:
        # 1. セッション作成リクエスト：transaction を追加
        res = requests.post(JANUS_URL, json={
            "janus": "create",
            "transaction": generate_transaction()
        })
        res.raise_for_status()
        json_response = res.json()
        if "data" not in json_response:
            raise Exception("Janus のレスポンスに 'data' キーが存在しません: " + str(json_response))
        session_id = json_response["data"]["id"]

        # 2. プラグインアタッチ：transaction を追加
        res = requests.post(f"{JANUS_URL}/{session_id}", json={
            "janus": "attach",
            "plugin": "janus.plugin.videoroom",
            "transaction": generate_transaction()
        })
        res.raise_for_status()
        attach_response = res.json()
        if "data" not in attach_response:
            raise Exception("プラグインアタッチ時のレスポンスに 'data' キーが存在しません: " + str(attach_response))
        handle_id = attach_response["data"]["id"]

        # 3. listparticipants リクエスト送信：transaction を追加
        body = {"request": "listparticipants", "room": room_id}
        if JANUS_ADMIN_KEY:
            body["admin_key"] = JANUS_ADMIN_KEY
        res = requests.post(f"{JANUS_URL}/{session_id}/{handle_id}", json={
            "janus": "message",
            "body": body,
            "transaction": generate_transaction()
        })
        res.raise_for_status()
        data_response = res.json()
        if data_response.get("janus") != "success":
            raise Exception("Janus からの listparticipants リクエストが失敗しました: " + str(data_response))
        participants = data_response["plugindata"]["data"].get("participants", [])
    except Exception as e:
        raise Exception(f"list_participants の実行中にエラーが発生しました: {str(e)}")
    finally:
        # セッションのクリーンアップ：各リクエストに transaction を追加
        try:
            requests.post(f"{JANUS_URL}/{session_id}/{handle_id}", json={
                "janus": "detach",
                "transaction": generate_transaction()
            })
            requests.post(f"{JANUS_URL}/{session_id}", json={
                "janus": "destroy",
                "transaction": generate_transaction()
            })
        except Exception:
            pass
    return participants
