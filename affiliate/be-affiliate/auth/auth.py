from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer

#FIXME:　環境変数から読み出す構成に変更
#SECRET_KEY = ""
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def is_correct_password(password, hashed_password) -> bool:
    return pwd_context.verify(password, hashed_password)

def get_hashed_password(password):
    return pwd_context.hash(password)