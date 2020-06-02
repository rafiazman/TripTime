# Base on offical Node.js Alpine image
FROM node:12.17.0-alpine


# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN CYPRESS_INSTALL_BINARY=0 npm install

# Copy all files
COPY ./ ./

# Workaround for supplying environment variables to Next.js during build-time instead of only to the server,
# giving access to client-side code instead of just server-side
ARG APP_HOSTNAME
ARG API_HOSTNAME
ARG PUSHER_APP_KEY
ARG PUSHER_APP_CLUSTER
ENV APP_HOSTNAME=$APP_HOSTNAME
ENV API_HOSTNAME=$API_HOSTNAME
ENV PUSHER_APP_KEY=$PUSHER_APP_KEY
ENV PUSHER_APP_CLUSTER=$PUSHER_APP_CLUSTER

# Build app
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run npm start script when container starts
CMD [ "npm", "start" ]