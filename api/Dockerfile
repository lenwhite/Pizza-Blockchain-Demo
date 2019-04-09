FROM node:latest as builder
RUN mkdir /app
WORKDIR /app
COPY ./package.json ./package-lock.json ./.babelrc ./
COPY ./src ./src
RUN npm install
RUN npm run build

FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install --only=prod
COPY --from=builder /app/dist ./dist
COPY ./contracts ./contracts
EXPOSE 80
CMD npm start
