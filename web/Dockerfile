FROM node:alpine AS build
ENV NODE_ENV=development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY *.json ./
COPY *.js ./
# COPY *.*rc ./
COPY src ./src

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist .
