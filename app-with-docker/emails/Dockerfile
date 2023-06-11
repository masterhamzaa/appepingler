FROM node:latest

WORKDIR /app/emails

COPY package.json .

RUN npm install

COPY . .

EXPOSE 1338

CMD npm start