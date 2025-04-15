import sys
import models.models as models
from datetime import datetime
from .databases import create_new_session

sys.dont_write_bytecode = True


def select_all():
    session = create_new_session()
    reserve_list = session.query(models.reserve).all()
    if reserve_list == None:
        reserve_list = []
    return reserve_list

def select_from_shop(shop_id):
    session = create_new_session()
    reserve_list = session.query(models.reserve).filter(models.reserve.shop_id == shop_id).all()
    if reserve_list == None:
        reserve_list = []
    return reserve_list

def select_from_id(reserve_id):
    session = create_new_session()
    reserve = session.query(models.reserve).filter(models.reserve.reserve_id == reserve_id).first()
    if reserve == None:
        return 1
    return reserve

def create(new_reserve):
    session = create_new_session()
    reserve = models.reserve()
    reserve.reserve_id = new_reserve["reserve_id"]
    reserve.shop_id = new_reserve["shop_id"]
    reserve.email = new_reserve["email"]
    reserve.date = datetime.strptime(new_reserve["date"], '%Y-%m-%d %H:%M:%S')
    reserve.name = new_reserve["name"]
    reserve.tel = new_reserve["tel"]
    reserve.visited = new_reserve["visited"]
    session.add(reserve)
    session.commit()
    return 0

def update(new_reserve):
    session = create_new_session()
    reserve = session.query(models.reserve).filter(models.reserve.reserve_id == new_reserve.reserve_id).first()
    if reserve == None:
        return 1
    reserve.shop_id = new_reserve.shop_id
    reserve.email = new_reserve.email
    reserve.date = datetime.strptime(new_reserve.date, '%Y-%m-%d %H:%M:%S')
    reserve.name = new_reserve.name
    reserve.tel = new_reserve.tel
    reserve.visited = new_reserve.visited
    reserve.request = new_reserve.request
    now_datetime = str(datetime.now().strftime("%Y%m%d%H%M%S"))
    reserve.updated_at = now_datetime
    session.commit()
    return 0

def delete(reserve_id):
    session = create_new_session()
    reserve = session.query(models.reserve).filter(models.reserve.reserve_id == reserve_id).first()
    if reserve == None:
        return 1
    session.delete(reserve)
    session.commit()
    return 0
    