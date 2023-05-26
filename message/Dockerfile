FROM node:lts-alpine3.17

WORKDIR /app/message

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 5002

CMD [ "npm", "start" ]