FROM node:11-alpine

RUN mkdir /truffle
WORKDIR /truffle
COPY ./package.json ./package-lock.json truffle.js ./
COPY ./migrations ./migrations
COPY ./contracts ./contracts
COPY ./test ./test
RUN npm install

ENV TRUFFLE_VERSION=5.0.18
RUN npm install -g truffle@${TRUFFLE_VERSION}

# Run truffle compile once to cache a copy of solc
# So future deployments won't have to download it
RUN truffle test

