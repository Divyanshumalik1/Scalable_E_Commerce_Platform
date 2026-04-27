FROM node:20-alpine

WORKDIR /app

# Copy workspace config
COPY package.json pnpm-workspace.yaml ./

# Copy shared package
COPY packages/shared ./packages/shared

# Copy service files
COPY apps/payment-service/package.json ./apps/payment-service/
COPY apps/payment-service/ ./apps/payment-service/

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --filter payment-service

WORKDIR /app/apps/payment-service

# Generate Prisma client
RUN npx prisma generate --schema=./prisma/payment.schema.prisma

EXPOSE 3004

CMD ["node", "payment_app.js"]