#!/usr/bin/env python3

import os
import subprocess
import time
from file import generate_filename  
import signal

FOLDER_PATH = "/record" 
DEVICE = "/dev/video62"
RECORD_DURATION = 3600 

def record_video():
    os.makedirs(FOLDER_PATH, exist_ok=True)

    while True:
        filename = generate_filename(FOLDER_PATH)
        filepath = os.path.join(FOLDER_PATH, filename)

        print(f"Recording to: {filepath}")

        gst_cmd = [
            "gst-launch-1.0", "-e",
            "v4l2src", f"device={DEVICE}",
            "!", "videoconvert",
            "!", "x264enc", "tune=zerolatency", "speed-preset=superfast",
            "!", "mp4mux", "faststart=true",
            "!", "filesink", f"location={filepath}"
        ]

        proc = subprocess.Popen(gst_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        try:
            time.sleep(RECORD_DURATION)
        finally:
            os.kill(proc.pid, signal.SIGINT)
            try:
                proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                proc.kill()

if __name__ == "__main__":
    record_video()
