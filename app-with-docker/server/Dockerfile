FROM node:latest

RUN npm install -g nodemon

WORKDIR /app/server

COPY package.json .

RUN npm install

COPY . .

EXPOSE 1337

CMD npm start