from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def is_correct_password(password, hashed_password) -> bool:
    return pwd_context.verify(password, hashed_password)

def get_hashed_password(password):
    return pwd_context.hash(password)