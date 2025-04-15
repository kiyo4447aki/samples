from sqlalchemy import Column, Integer, String, DateTime, CHAR, Time, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import sys
from sqlalchemy.ext.declarative import declarative_base

sys.dont_write_bytecode = True

Base = declarative_base()

class af_user(Base):
    __tablename__ = "af_users"
    af_id = Column(CHAR(8), unique=True, primary_key=True,nullable=False)
    email = Column(String(255),nullable=False)
    hashed_password = Column(String(255),nullable=False)
    name = Column(String(255),nullable=False)
    account = Column(String(255))
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    
    rewards = relationship("reward", backref="af_users")
    reserves = relationship("reserve", backref="af_users")

    def __init__(self):
        now_datetime = str(datetime.now().strftime("%Y%m%d%H%M%S"))
        self.created_at = now_datetime
        self.updated_at = now_datetime
        
    def to_dict(self):
        return {
            "af_id": self.af_id,
            "email": self.email,
            "hashed_password": self.hashed_password,
            "name": self.name,
            "account": self.account,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
        
class shop(Base):
    __tablename__ = "shops"
    shop_id = Column(CHAR(7), unique=True, primary_key=True,nullable=False)
    email = Column(String(255),nullable=False)
    hashed_password = Column(String(255),nullable=False)
    name = Column(String(255))
    address = Column(String(255))
    tel = Column(String(255))
    opening_time = Column(Time)
    closing_time = Column(Time)
    start_time = Column(Time)
    end_time = Column(Time)
    change_accept = Column(Integer)
    sameday_reserve = Column(Boolean)
    notification_token = Column(String(255))
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    
    reserves = relationship("reserve", backref="shops")

    def __init__(self):
        now_datetime = str(datetime.now().strftime("%Y%m%d%H%M%S"))
        self.created_at = now_datetime
        self.updated_at = now_datetime
        
class reserve(Base):
    __tablename__ = "reserves"
    reserve_id = Column(CHAR(20), unique=True, primary_key=True)
    shop_id = Column(CHAR(7) , ForeignKey("shops.shop_id"), nullable=False)
    email = Column(String(255),nullable=False)
    date = Column(DateTime,nullable=False)
    name = Column(String(255),nullable=False)
    tel = Column(String(255),nullable=False)
    request = Column(String(255))
    visited = Column(Boolean,nullable=False)
    af_id = Column(CHAR(8), ForeignKey("af_users.af_id"))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    
    reward = relationship("reward", backref="reserves", uselist=False)

    def __init__(self):
        now_datetime = str(datetime.now().strftime("%Y%m%d%H%M%S"))
        self.created_at = now_datetime
        self.updated_at = now_datetime
        
class reward(Base):
    __tablename__ = "rewards"
    reawrd_id = Column(CHAR(20), unique=True, primary_key=True)
    reserve_id = Column(CHAR(20),ForeignKey("reserves.reserve_id") ,nullable=False)
    af_id = Column(CHAR(8),ForeignKey("af_users.af_id") , nullable=False)
    date = Column(DateTime, nullable=False)
    amount = Column(Integer, nullable=False)
    is_paid = Column(Boolean, nullable=False)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    def __init__(self):
        now_datetime = str(datetime.now().strftime("%Y%m%d%H%M%S"))
        self.created_at = now_datetime
        self.updated_at = now_datetime
        

if __name__ == "__main__":
    from sqlalchemy import create_engine
    url = "mysql+pymysql://kiyo:Testmysql1204@kiyo-mysql.mysql.database.azure.com:3306/affiliate?charset=utf8"
    engine = create_engine(url, echo=True, pool_recycle=10)
    Base.metadata.create_all(bind=engine)