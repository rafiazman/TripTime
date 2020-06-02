# pull official base image
FROM node:12.17.0-alpine

# Set working directory
WORKDIR /app


# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN CYPRESS_INSTALL_BINARY=0 npm install

# Copy all files
COPY ./ ./

# Build app
RUN npm run build

# Run npm start script when container starts
CMD [ "npm", "start" ]
