FROM node:alpine

WORKDIR /app
COPY package.json .
RUN yarn

COPY . .

EXPOSE 3333 9229
CMD ["yarn orm:run && yarn start:dev"]