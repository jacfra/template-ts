# multi stage build

# ###################
# #### ssl stage ####
# ###################

# FROM alpine as ssl

# WORKDIR /

# RUN apk update && \
#     apk add --no-cache openssl && \
#     rm -rf /var/cache/apk/*

# RUN mkdir cert

# # openssl
# # -nodes flag allows the key(s) to unencrypted
# # -batch runs the command in non interactive mode
# RUN openssl req -x509 -newkey rsa:2048 -keyout ./cert/domain.key -out ./cert/domain.crt -days 365 -nodes -batch

######################
#### build stage ####
######################

FROM node:lts-alpine as build

WORKDIR /

# copy files needed for build
COPY package.json /
COPY package-lock.json /
COPY tsconfig.json /
COPY deploy.tsconfig.json /
COPY /src /src

# install and build
RUN npm install
RUN npm run build

######################
#### deploy stage ####
######################

FROM node:lts as deploy

WORKDIR /app

# copy files needed to start production server
COPY --from=build /dist /app/dist/
COPY --from=build /node_modules /app/node_modules/

# copy files to encrypt traffic
# COPY --from=ssl ./cert/ /app/dist/cert/

# Script to wait for database to come online
COPY ./wait-for-it.sh /app/

# just enables wait-for-it.sh
# the actual script is run in docker compose
RUN chmod +x /app/wait-for-it.sh

# pm2 for production process management
RUN npm -g add pm2

# config for running pm2
COPY ecosystem.config.js /app/