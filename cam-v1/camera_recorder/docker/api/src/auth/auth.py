from passlib.context import CryptContext
import requests

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

auth_url = ""

def is_correct_password(camera_id, password) -> bool:
    data = {
        "camera_id": camera_id,
        "password": password,
        "client_id": camera_id
    }
    try:
        response = requests.post(url=auth_url, json=data)
        response.raise_for_status() 
        response_json = response.json()
        if response_json.get("auth") == "success":
            return True
        else:
            False
    except:
        return False

def get_hashed_password(password):
    return pwd_context.hash(password)