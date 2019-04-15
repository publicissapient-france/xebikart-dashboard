FROM node:11.14.0-alpine
LABEL project=xebikart
LABEL maintainer=xebikart-team-dashboard

WORKDIR /sources

COPY package.json .
COPY yarn.lock    .

RUN yarn install

# Reminder: copy-ing a directory copies the content, so we have to make the
# target path explicit
COPY config ./config
COPY src    ./src
COPY public ./public

RUN yarn build

FROM nginx:1.15.11-alpine

COPY --from=0 /sources/build /usr/share/nginx/html
