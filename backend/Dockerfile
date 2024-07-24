FROM node:20.11.0-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS development
RUN npm install
COPY . .
EXPOSE 4001
CMD ["npm", "run", "dev"]