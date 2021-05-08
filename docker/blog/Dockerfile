FROM node:14-alpine AS base

WORKDIR /src/essay

ADD ./package.json .
RUN npm i

FROM base AS run
CMD ["npm", "run", "dev"]

FROM base AS test
CMD ["npm", "run", "test"]
