FROM node:12.22.9-alpine

WORKDIR /tunnel

RUN yarn global add localtunnel

ENTRYPOINT [ "sh", "-c", "lt --host http://backend.skypics.jp:3000 --port 3000 --subdomain $SUB_DOMAIN"]

#ENTRYPOINT [ "sleep", "infinity" ]