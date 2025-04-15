import sys
import models.models as models
from datetime import datetime
from .databases import create_new_session

sys.dont_write_bytecode = True

def select_all():
    session = create_new_session()
    user_list = session.query(models.af_user).all()
    if user_list == None:
        user_list = []
    return user_list

def create(new_user):
    session = create_new_session()
    user = models.af_user()
    print(user.af_id)
    user.af_id = new_user["af_id"]
    user.name = new_user["name"]
    user.email = new_user["email"]
    user.account = new_user["account"]
    user.hashed_password = new_user["hashed_password"]
    session.add(user)
    session.commit()
    return 0

def select(af_id):
    session = create_new_session()
    user = session.query(models.af_user).filter(models.af_user.af_id == af_id).first()
    if user == None:
        return 1
    return user



def update(new_user):
    session = create_new_session()
    user = session.query(models.af_user).filter(models.af_user.af_id == new_user.af_id).first()
    if user == None:
        return 1
    user.email = new_user.email
    user.name = new_user.name
    user.account = new_user.account
    now_datetime = str(datetime.now().strftime("%Y%m%d%H%M%S"))
    user.updated_at = now_datetime
    session.commit()
    return 0

def delete(af_id):
    session = create_new_session()
    user = session.query(models.af_user).filter(models.af_user.af_id == af_id).first()
    if user == None:
        return 1
    session.delete(user)
    session.commit()
    return 0
