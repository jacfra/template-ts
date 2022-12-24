# multi stage build

###################
#### ssl stage ####
###################

# FROM alpine as ssl

# WORKDIR /

# RUN apk update && \
#     apk add --no-cache openssl && \
#     rm -rf /var/cache/apk/*

# RUN mkdir cert

# # openssl
# # -nodes flag allows the key(s) to unencrypted
# # -batch runs the command in non interactive mode
# RUN openssl req -x509 -newkey rsa:4096 -keyout ./cert/key.pem -out ./cert/cert.pem -days 365 -nodes -batch

####################
### react stage ####
####################

FROM node:lts-alpine as react

# set work dir
WORKDIR /

# copy package.json
COPY /react/package.json /
COPY /react/yarn.lock /
COPY /react/tsconfig.json /
COPY /react/src /src
COPY /react/config /config
COPY /react/scripts /scripts
COPY /react/public /public

# install dependencies
RUN npm install

# build
RUN npm run build

#########################
###### static stage #####
#########################

FROM node:lts-alpine as node

WORKDIR /

COPY /node/package.json /
COPY /node/package-lock.json /
COPY /node/tsconfig.json /
COPY /node/deploy.tsconfig.json /
COPY /node/src /src

# install dependencies
RUN npm install

# build
RUN npm run build


######################
#### deploy stage ####
######################

FROM node:lts as deploy

WORKDIR /app

COPY --from=node /dist /app/dist
COPY --from=react /build /app/dist/public/
# COPY --from=ssl ./cert/ /app/dist/cert/

COPY --from=node /node_modules /app/node_modules

# Script to wait for database to come online
COPY /node/wait-for-it.sh /app/

# just enables wait-for-it.sh
# the actual script is run in docker compose
RUN chmod +x /app/wait-for-it.sh