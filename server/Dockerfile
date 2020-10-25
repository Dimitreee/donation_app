FROM node:alpine
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080

CMD ["npm", "run", "start:watch"]
