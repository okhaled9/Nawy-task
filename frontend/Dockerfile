FROM node:20-alpine3.20
WORKDIR /app
COPY package*.json ./
RUN npm i --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD [ "npm","run","dev" ]