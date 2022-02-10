FROM python:3.10
# .1-alpine
EXPOSE 8000
WORKDIR /app
ADD . /app
RUN ls

# RUN sudo apt-get install tk-dev
# RUN apk update && apk add bash
# RUN apk add --no-cache mariadb-connector-c-dev
# RUN apk update && apk add python3 python3-dev mariadb-dev build-base && pip3 install mysqlclient && apk del python3-dev mariadb-dev build-base tk-dev
RUN pip install mysqlclient
# RUN apk add netcat-openbsd
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
# RUN python manage.py makemigrations
# RUN python manage.py migrate
# CMD ["python", "manage.py" , "runserver"]
