FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/notification-service/ ./apps/notification-service/

RUN npm install -g pnpm
RUN pnpm install --filter notification-service

WORKDIR /app/apps/notification-service

EXPOSE 3006

CMD ["node", "notification_service.js"]