FROM node:latest

RUN npm install -g nodemon

WORKDIR /app/emails

COPY package.json .

RUN npm install

COPY . .

EXPOSE 1338

CMD npm start