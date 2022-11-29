# multi stage build

### build stage ###
FROM node:lts-alpine as build

# set work dir
WORKDIR /

# copy package.json
COPY package.json /
COPY yarn.lock /
COPY tsconfig.json /
COPY /src /src
COPY /public /public

# install dependencies
RUN yarn

# build
RUN yarn build

### host stage ###
FROM nginx:alpine

# set work dir
WORKDIR /

#copy nginx configuration
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Remove default nginx static assets
RUN rm -rf ./usr/share/nginx/html/*

# copy the build dir to nginx static assets
COPY --from=build /build /usr/share/nginx/html