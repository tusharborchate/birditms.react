FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install -f

COPY . .

EXPOSE 8080

cmd ["npm","start"]


