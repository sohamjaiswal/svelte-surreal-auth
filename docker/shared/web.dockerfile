FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache git
RUN git config --global --add safe.directory /app

COPY ../../web/package.json ./
COPY ../../web/yarn.lock ./

CMD yarn; yarn dev