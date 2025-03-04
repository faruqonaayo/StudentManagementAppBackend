FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install --production

CMD [ "node", "index.js" ]

