FROM node:14.16.1-alpine3.13
WORKDIR /app

COPY . .
RUN npm install
RUN npm install -g typescript
RUN npm install -g ts-node

EXPOSE 3000

CMD [ "npm", "run", "go" ]