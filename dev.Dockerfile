FROM docker/dev-environments-javascript:stable-1

RUN yarn global add typeorm

RUN yarn -w /server
RUN yarn -w /client