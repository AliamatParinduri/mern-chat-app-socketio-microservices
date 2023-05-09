FROM node:lts-alpine3.17

WORKDIR /app/frontend

COPY package*.json .

RUN npm i

COPY . .

CMD [ "npm", "run", "dev" ]