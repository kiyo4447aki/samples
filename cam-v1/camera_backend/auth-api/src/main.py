from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from rooting import router
import uvicorn
import gunicorn

app = FastAPI(root_path="/auth",docs_url=None, redoc_url=None, openapi_url=None, debug=False)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)