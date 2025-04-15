from .exceptions import *
from fastapi import Request, Response
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware


class ErrorhandlingMiddleware(BaseHTTPMiddleware):
    
    async def dispatch(self, request: Request, call_next) -> Response:
        try:
            response: Response = await call_next(request)
            
        except WrongNameException as e:
            return JSONResponse(
                status_code=404,
                content={"message":f"DBに{e.name}の項目が見つかりませんでした。内容を確認してください。"}
            )
        
        except CreateFailedException as e:
            return JSONResponse(
                status_code=400,
                content={"message":"DBへの登録に失敗しました。入力内容を確認してください。",
                        "data":e.data
                        }
            )
            
        except DeleteFailedException as e:
            return JSONResponse(
                status_code=422,
                content={"message":"項目の削除に失敗しました。",
                        "id":e.id
                        }
            )
        
        except UpdateFailedException as e:
            return JSONResponse(
                status_code=422,
                content={"message":"更新に失敗しました",
                        "id":e.id
                        }
            )
        
        except AccessForbiddenException as e:
            return JSONResponse(
                status_code=403,
                content={"message":"権限がありません",
                        "id":e.id
                        }
            )
            
        except AuthException as e:
            #e.detailを利用してロギング
            return JSONResponse(
                status_code=403,
                content={"message":"認証エラーです"}
            )
        
        return response
