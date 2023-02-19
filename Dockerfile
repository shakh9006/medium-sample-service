FROM node:latest

RUN apt update && apt install -y apt-transport-https ca-certificates sqlite3
RUN npm i -g npm forever
RUN npm i -g nodemon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm uninstall --save sqlite3
RUN npm install --save sqlite3

EXPOSE 8080
WORKDIR /app
COPY start.sh /start.sh
RUN chmod +x /start.sh

ENTRYPOINT ["/start.sh"]