FROM node:12.22.9-alpine

WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/

RUN yarn install --production && yarn cache clean
RUN yarn add esm@3

COPY . /app

ENV NODE_ENV production
ENTRYPOINT ["node", "-r", "esm" ,"./bin/server", "--port", "6500", "--domain", "backend.skypics.jp"]
