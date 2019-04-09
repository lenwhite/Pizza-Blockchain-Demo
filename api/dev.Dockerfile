FROM node:latest

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

ENV CHOKIDAR_USEPOLLING true
cmd npm start
