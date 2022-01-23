FROM node:17-alpine

COPY . /app
RUN mkdir -p /static && mkdir -p /app
WORKDIR /app
RUN yarn && yarn build
CMD node dist/main
