FROM node:latest

# Disable Next.js telemetry: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Copy whole repo into /app dir inside container
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies without modifying package-lock.json
RUN npm ci

# Build next.js app
RUN npm run build

# Expose port 3000 (Next.js default) to the outside
EXPOSE 3000

# Start application
CMD ["npm", "start"]

