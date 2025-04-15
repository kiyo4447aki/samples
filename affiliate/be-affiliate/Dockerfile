FROM python:3.10

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . /code/

CMD [ "python","-m","gunicorn","main:app","-w","4","-k","uvicorn.workers.UvicornWorker","--bind","0.0.0.0:8080" ]

EXPOSE 8080