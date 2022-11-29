FROM node:lts-alpine as build

WORKDIR /

# copy files needed for build
COPY package.json /
COPY yarn.lock /
COPY tsconfig.json /
COPY /src /src

# install and build
RUN yarn
RUN yarn clean
RUN yarn build


# hosting part of multi stage build
FROM node:lts-alpine

# copy files needed to serve
COPY --from=build /package.json /
COPY --from=build /node_modules /node_modules
COPY --from=build /dist /dist
COPY wait-for-it.sh /
COPY ecosystem.config.js /

# pm2 for production process management
RUN yarn global add pm2

RUN apk update 
RUN apk add bash

# just enables wait-for-it.sh
# the actual script is run in docker compose
RUN chmod +x ./wait-for-it.sh