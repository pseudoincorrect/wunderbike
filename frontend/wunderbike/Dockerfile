FROM node:16-alpine AS builder

WORKDIR /home/node/app

COPY ./package*.json ./

RUN npm install

FROM builder

EXPOSE 80

CMD ["npm", "run", "deploy"]