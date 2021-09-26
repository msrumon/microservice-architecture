FROM node:alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine

WORKDIR /app

COPY --from=build /app/dist .
COPY --from=build /app/package.json ./

RUN npm install --production

EXPOSE 4000

USER node

CMD [ "node", "main" ]
