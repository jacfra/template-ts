FROM docker/dev-environments-javascript:stable-1

RUN yarn global add typeorm

WORKDIR /server
RUN yarn

WORKDIR /client
RUN yarn 