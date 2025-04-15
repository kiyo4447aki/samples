import sys
import models.models as models
from datetime import datetime
from .databases import create_new_session

sys.dont_write_bytecode = True

def select_all():
    session = create_new_session()
    shop_list = session.query(models.shop).all()
    if shop_list == None:
        shop_list = []
    return shop_list

def create(new_shop):
    session = create_new_session()
    shop = models.shop()
    shop.shop_id = new_shop["shop_id"]
    shop.email = new_shop["email"]
    shop.hashed_password = new_shop["hashed_password"]

    session.add(shop)
    session.commit()
    return 0

def select(shop_id):
    session = create_new_session()
    shop = session.query(models.shop).filter(models.shop.shop_id == shop_id).first()
    if shop == None:
        return 1
    return shop

def select_from_email(email):
    session = create_new_session()
    shop = session.query(models.shop).filter(models.shop.email == email).first()
    if shop == None:
        return 1
    return shop

def update(new_shop):
    session = create_new_session()
    shop = session.query(models.shop).filter(models.shop.shop_id == new_shop.shop_id).first()
    if shop == None:
        return 1
    shop.name = new_shop.name
    shop.address = new_shop.address
    shop.tel = new_shop.tel
    shop.opening_time = new_shop.opening_time
    shop.closing_time = new_shop.closing_time
    shop.start_time = new_shop.start_time
    shop.end_time = new_shop.end_time
    shop.change_accept = new_shop.change_accept
    shop.sameday_reserve = new_shop.sameday_reserve
    now_datetime = str(datetime.now().strftime("%Y%m%d%H%M%S"))
    shop.updated_at = now_datetime
    session.commit()
    return 0

def delete(shop_id):
    session = create_new_session()
    shop = session.query(models.shop).filter(models.shop.shop_id == shop_id).first()
    if shop == None:
        return 1
    session.delete(shop)
    session.commit()
    return 0
