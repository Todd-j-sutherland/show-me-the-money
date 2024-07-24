FROM node:20.11.0-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS development
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "start"]