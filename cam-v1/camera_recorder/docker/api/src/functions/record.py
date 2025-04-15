import ffmpeg
from datetime import timedelta

def get_duration(filename):
    probe = ffmpeg.probe("/record/"+filename)
    return probe["format"]["duration"]

def get_record_info(filename):
    id = filename.split("-")[0]
    try:
        duration = float(get_duration(filename))
    except:
        return
    td = timedelta(seconds=int(duration))
    record = {"id": id, "name": filename, "duration": str(td)}
    return record