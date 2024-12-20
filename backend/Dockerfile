FROM node:20-alpine3.20
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 8000
RUN chmod +x ./entrypoint.sh
ENTRYPOINT [ "./entrypoint.sh" ]
CMD [ "npm","run","dev" ]
