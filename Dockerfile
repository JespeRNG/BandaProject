FROM node:20-alpine

WORKDIR /base

RUN chmod -R 755 ./

COPY ./tsconfig.json ./
COPY ./tsconfig.build.json ./
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./src ./src/

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
