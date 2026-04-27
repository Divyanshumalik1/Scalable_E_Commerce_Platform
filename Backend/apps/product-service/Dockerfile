FROM node:20-alpine

WORKDIR /app

# Copy workspace config
COPY package.json pnpm-workspace.yaml ./

# Copy shared package
COPY packages/shared ./packages/shared

# Copy service files
COPY apps/product-service/package.json ./apps/product-service/
COPY apps/product-service/ ./apps/product-service/

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --filter product-service

WORKDIR /app/apps/product-service

# Generate Prisma client
RUN npx prisma generate --schema=./prisma/product.schema.prisma

EXPOSE 3002

CMD ["node", "app.js"]



# FROM node:22-alpine

# WORKDIR /app

# # Install deps
# COPY package*.json ./
# RUN npm install

# # Copy source
# COPY . .

# # Generate Prisma client
# RUN npx prisma generate

# # Build (if TypeScript)
# # RUN npm run build

# EXPOSE 3003

# CMD ["npm", "run", "start"]