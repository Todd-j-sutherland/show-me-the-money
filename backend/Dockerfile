FROM node:20.11.0

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm run build

EXPOSE 4000
CMD ["node", "dist/index.js"]
