# pull official base image
FROM node:12.17.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN CYPRESS_INSTALL_BINARY=0 npm install

# add app
COPY . ./

# start app
CMD ["npm", "run", "dev"]