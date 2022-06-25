FROM node:16-alpine

WORKDIR /home/node/app

COPY ./package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]