FROM node:20-alpine3.20
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 8000
CMD [ "npm","run","dev" ]