from sqlalchemy import Column, CHAR, String, DateTime
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
import sys
sys.dont_write_bytecode = True

Base = declarative_base()

class Camera(Base):
    __tablename__ = "cameras"
    camera_id = Column(CHAR(8), unique=True, primary_key=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    signaling_key = Column(String(255), nullable=False)
    
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    
    def __init__(self):
        now_datetime = str(datetime.now().strftime("%Y%m%d%H%M%S"))
        self.created_at = now_datetime
        self.updated_at = now_datetime
        
if __name__ == "__main__":
    from sqlalchemy import create_engine
    url = "mysql+pymysql://root:Testmysql1204@mysql:3306/camera_app?charset=utf8"
    engine = create_engine(url, echo=True, pool_recycle=10)
    Base.metadata.create_all(bind=engine)