#!/usr/bin/env python3

import subprocess
import requests
import json
import certifi

MOMO_PATH: str = "./package/momo"
AUTH_URL: str = ""
SIGNALING_URL: str = ""

CAMERA_ID: str = ""
ACCESS_KEY: str = ""

def get_signaling_key() -> str:
    request_body = {
        "camera_id": CAMERA_ID,
        "password": ACCESS_KEY,
        "client_id": CAMERA_ID
    }
    response = requests.post(AUTH_URL, json.dumps(request_body))
    response.raise_for_status() 
    response_json = response.json()
    return response_json.get("signaling_key")

def main():
    signaling_key = get_signaling_key()
    command = f"{MOMO_PATH} --no-audio-device --video-device /dev/video63 ayame --room-id {CAMERA_ID} --signaling-key {signaling_key} --signaling-url {SIGNALING_URL}".split(" ")
    print("starting momo")
    subprocess.run(command)

if __name__ == "__main__":
    main()
