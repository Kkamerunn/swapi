FROM node:18

WORKDIR /swapiapp
COPY package.json .
RUN npm install

COPY . .
CMD npm start