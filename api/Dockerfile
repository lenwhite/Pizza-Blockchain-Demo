FROM node:11-alpine as builder

# Needed for web3 to work?
# See: https://github.com/ethereum/web3.js/issues/1416#issuecomment-459343945
RUN apk update && apk upgrade 
RUN apk add --no-cache bash git openssh
RUN apk add --update python krb5 krb5-libs gcc make g++ krb5-dev

RUN mkdir /app
WORKDIR /app
COPY ./package.json ./package-lock.json ./
COPY ./src ./src
RUN npm install
RUN npm run build

FROM node:11-alpine
RUN mkdir /app
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install --only=prod
COPY --from=builder /app/dist ./dist
COPY ./contracts ./contracts
EXPOSE 80
CMD npm start
