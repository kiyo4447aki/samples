import sys
import models
from datetime import datetime
from .databases import create_new_session

sys.dont_write_bytecode = True

def select_all():
    session = create_new_session()
    camera_list = session.query(models.Camera).all()
    if camera_list == None:
        camera_list = []
    return camera_list

def create(new_camera):
    session = create_new_session()
    camera = models.Camera()
    camera.camera_id = new_camera["camera_id"]
    camera.signaling_key = new_camera["signaling_key"]
    camera.hashed_password = new_camera["hashed_password"]
    session.add(camera)
    session.commit()
    return 0
    
def select(camera_id):
    session = create_new_session()
    camera = session.query(models.Camera).filter(models.Camera.camera_id == camera_id).first()
    if camera == None:
        raise Exception
    return camera

def update(new_camera):
    session = create_new_session()
    camera = session.query(models.Camera).filter(models.Camera.camera_id == new_camera.camera_id).first()
    if camera == None:
        return Exception
    camera.signaling_key = new_camera["signaling_key"]
    camera.hashed_password = new_camera["hashed_password"]
    now_datetime = str(datetime.now().strftime("%Y%m%d%H%M%S"))
    camera.updated_at = now_datetime
    session.commit()
    return 0
    
def delete(camera_id):
    session = create_new_session()
    camera = session.query(models.Camera).filter(models.Camera.camera_id == camera_id).first()
    if camera == None:
        return Exception
    session.delete(camera)
    session.commit()
    return 0
    