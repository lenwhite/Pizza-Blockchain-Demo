FROM node:latest as builder
RUN mkdir /app
WORKDIR /app
RUN mkdir /src /public
COPY ./package.json ./package-lock.json ./
COPY ./src ./src
COPY ./public ./public
RUN npm install
RUN npm run build

FROM node:latest
RUN mkdir /app
WORKDIR /app
RUN npm install -g serve@latest
COPY --from=builder /app/build ./
EXPOSE 80
CMD serve -p 80 -s .
