FROM node:lts-alpine AS build
ENV NODE_ENV=development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY *.json ./
COPY src .

RUN npm run build

FROM node:lts-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/dist .
COPY --from=build /app/node_modules .
COPY --from=build /app/package*.json ./

RUN npm prune

EXPOSE 3003

USER node

CMD [ "node", "main.js" ]
