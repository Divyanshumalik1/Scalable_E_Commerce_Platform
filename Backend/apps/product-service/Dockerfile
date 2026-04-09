FROM node:22-alpine

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build (if TypeScript)
# RUN npm run build

EXPOSE 3002

CMD ["npm", "run", "start"]