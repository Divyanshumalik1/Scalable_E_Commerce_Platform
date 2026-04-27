FROM node:20-alpine

WORKDIR /app

# Copy workspace config
COPY package.json pnpm-workspace.yaml ./

# Copy shared package
COPY packages/shared ./packages/shared

# Copy service files
COPY apps/order-service/package.json ./apps/order-service/
COPY apps/order-service/ ./apps/order-service/

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --filter order-service

WORKDIR /app/apps/order-service

# Generate Prisma client
RUN npx prisma generate --schema=./prisma/order.schema.prisma

EXPOSE 3003

CMD ["node", "order_app.js"]