FROM node:20-alpine

WORKDIR /app

# Copy workspace config
COPY package.json pnpm-workspace.yaml ./

# Copy shared packages
COPY packages/shared ./packages/shared

# Copy service files
COPY apps/user-service/package.json ./apps/user-service/
COPY apps/user-service/ ./apps/user-service/

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --filter user-service

WORKDIR /app/apps/user-service

EXPOSE 3001

CMD ["node", "app.js"]