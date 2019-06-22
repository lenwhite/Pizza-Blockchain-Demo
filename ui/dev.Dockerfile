FROM node:11-alpine

RUN mkdir /app
WORKDIR /app
RUN mkdir /src /public
COPY ./package.json ./package-lock.json ./
COPY ./src ./src
COPY ./public ./public
RUN npm install

ENV CHOKIDAR_USEPOLLING true

EXPOSE 3000
CMD npm start
