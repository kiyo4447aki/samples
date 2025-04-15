from sqlalchemy import create_engine
import sys
from sqlalchemy.orm import (sessionmaker, relationship, scoped_session)

sys.dont_write_bytecode = True

url = "mysql+pymysql://kiyo:Testmysql1204@kiyo-mysql.mysql.database.azure.com:3306/affiliate?charset=utf8"
engine = create_engine(url, echo=False, pool_recycle=10)

def create_new_session():
    session_factory = sessionmaker(autoflush=True, expire_on_commit=False, bind=engine)
    return scoped_session(session_factory)