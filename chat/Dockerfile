FROM node:lts-alpine3.17

WORKDIR /app/chat

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 5001

CMD [ "npm", "start" ]