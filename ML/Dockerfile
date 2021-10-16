FROM python:3.9.1

ADD . /usr/local/app/

WORKDIR /usr/local/app/

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 4102:4102

CMD ["python", "api.py"]
