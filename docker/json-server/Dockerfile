FROM node:14-alpine

WORKDIR /src/json-server

ADD ./docker/json-server .
RUN npm i -g json-server

CMD ["json-server", "--watch", "data.js", "--routes", "routes.json", "--middlewares", "auth.js", "--host", "0.0.0.0"]
