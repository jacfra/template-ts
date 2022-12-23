# multi stage build

######################
#### build stage ####
######################

FROM node:lts-alpine as build

WORKDIR /

# copy files needed for build
COPY package.json /
COPY yarn.lock /
COPY tsconfig.json /
COPY deploy.tsconfig.json /
COPY /src /src

# install and build
RUN yarn install --offline
RUN yarn build

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