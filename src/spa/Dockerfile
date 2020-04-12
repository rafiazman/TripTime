# Documentation: https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image
FROM node:12.16.2-stretch as build

COPY . /src
WORKDIR /src

RUN npm ci
RUN npm run build
RUN npm prune --production

FROM node:12.16.2-stretch

WORKDIR /usr/app

COPY --from=build /src/node_modules /usr/app/node_modules
COPY --from=build /src/package.json /usr/app/package.json
COPY --from=build /src/.next /usr/app/.next
COPY --from=build /src/public /usr/app/public

EXPOSE 3000
CMD ["npm", "start"]
