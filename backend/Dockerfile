FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 5000


CMD ["npm", "start"]
