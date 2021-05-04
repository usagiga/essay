FROM node:14-alpine

WORKDIR /src/essay

ADD ./package.json .
RUN npm i

CMD ["npm", "run", "dev"]
