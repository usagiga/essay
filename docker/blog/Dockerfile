# Base Image
FROM node:14-alpine AS base

## Install dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

## Install dependencies of essay
WORKDIR /src/essay
ADD ./package.json .
RUN npm i

# Debug Server Image
FROM base AS run
CMD dockerize --wait $JSON_SERVER_HOST:$JSON_SERVER_PORT npm run dev

# Unit Test Image
FROM base AS test
CMD dockerize --wait $JSON_SERVER_HOST:$JSON_SERVER_PORT npm run test
