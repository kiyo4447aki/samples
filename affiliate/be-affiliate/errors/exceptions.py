

class WrongNameException(Exception):
    def __init__(self, name: str = ""):
        self.name = name
        

class CreateFailedException(Exception):
    def __init__(self, data):
        self.data = data
        
class DeleteFailedException(Exception):
    def __init__(self, id: str):
        self.id = id

class UpdateFailedException(Exception):
    def __init__(self, id: str):
        self.id = id
        
class AccessForbiddenException(Exception):
    def __init__(self, id: str):
        self.id = id
        
class AuthException(Exception):
    def __init__(self, detail: str):
        self.detail = detail