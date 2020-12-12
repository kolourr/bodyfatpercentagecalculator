FROM python:3.9

FROM jjanzic/docker-python3-opencv

RUN apt-get update && apt-get install -y git python3-dev gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip3 install --upgrade -r requirements.txt

RUN pip3 install --upgrade pip

COPY app app/

RUN python app/server.py

EXPOSE 5000

CMD ["python", "app/server.py", "serve"]
