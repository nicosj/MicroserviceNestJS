FROM node:20

WORKDIR /app

COPY package.json ./
RUN npm install
RUN nest build
COPY ./dist ./src
CMD ["node", "src/main"]
