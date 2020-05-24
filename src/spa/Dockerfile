# Documentation: https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image
FROM node:12.16.2-stretch as build

# Set working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json before other files Utilise Docker cache to save re-installing dependencies if
# unchanged
COPY ./package*.json ./

# Install dependencies
RUN CYPRESS_INSTALL_BINARY=0 npm install

# Copy all files
COPY ./ ./

# Expose the listening port
EXPOSE 3000

