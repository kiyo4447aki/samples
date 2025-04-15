FROM python:3.10

WORKDIR /api

RUN curl -sSL https://install.python-poetry.org | python3
ENV PATH /root/.local/bin:$PATH
COPY pyproject.toml* poetry.lock* ./

RUN poetry config virtualenvs.in-project true
RUN poetry install --no-root

RUN apt update && apt install ffmpeg -y

COPY /src /api/src

ENTRYPOINT ["poetry", "run", "python", "src/main.py"]