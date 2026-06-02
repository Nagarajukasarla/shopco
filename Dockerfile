# Build stage
FROM oven/bun:1.2 AS builder
WORKDIR /app

# Install dependencies first for better caching
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy the rest of the application files and build
COPY . .
RUN bun run build

# Production stage using Nginx to serve static files
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
