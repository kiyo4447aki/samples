FROM python:3.10

WORKDIR /auth_server

RUN curl -sSL https://install.python-poetry.org | python3
ENV PATH /root/.local/bin:$PATH
COPY pyproject.toml* poetry.lock* ./

RUN poetry config virtualenvs.in-project true
RUN poetry install --no-root

COPY /src /auth_server/src

#ENTRYPOINT ["poetry", "run", "python", "src/main.py"]

WORKDIR /auth_server/src

ENTRYPOINT [ "poetry", "run", "gunicorn", "main:app", "-w", "2", "--threads", "2" ,"-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]