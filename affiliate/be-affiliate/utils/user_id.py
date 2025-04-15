import random
import string
import sys
sys.path.append("../")
from handle_db import af_user_db, shop_db, reserve_db

def create_af_id():
    is_exist_id = True
    while is_exist_id == True:
        new_id = "A"+ generate_randint(7)
        db = af_user_db.select_all()
        id_list = [user.af_id for user in db]
        is_exist_id = new_id in id_list
        
    return new_id

def create_shop_id():
    is_exist_id = True
    while is_exist_id == True:
        new_id = "S"+ generate_randint(6)
        db = shop_db.select_all()
        id_list = [shop.shop_id for shop in db]
        is_exist_id = new_id in id_list

    return new_id

def create_reserve_id():
    is_exist_id = True
    while is_exist_id == True:
        new_id = "R"+ generate_randint(7)
        db = reserve_db.select_all()
        id_list = [reserve.reserve_id for reserve in db]
        is_exist_id = new_id in id_list
    return new_id

def generate_randint(k):
    letters = string.digits
    rand = "".join(random.choices(letters,k=k))
    return rand
    
if __name__ == "__main__":
    print("R"+ generate_randint(7))