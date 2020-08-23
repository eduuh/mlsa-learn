FROM node:14-slim as base
LABEL org.opencontainers.image.authors=edwin@muraya
LABEL org.opencontainers.image.title="Dekut survellance"
LABEL org.opencontainers.image.licenses=MIT
LABEL com.edwin.nodeversion=$NODE_VERSION

ENV NODE_ENV=production
EXPOSE 5000
ENV PORT 5000
WORKDIR /app

COPY package*.json ./
RUN npm config list
RUN npm ci && npm cache clean --force

ENV PATH /app/node_modules/.bin:$PATH
CMD [ "node", "app.js" ]

FROM base as dev
ENV NODE_ENV=development
RUN apt-get update -qq && apt-get install -qy \ 
    ca-certificates \
    bzip2 \
    curl \
    libfontconfig \
    --no-install-recommends
RUN npm config list
RUN  npm install --only=development && npm cache clean --force

CMD [ "nodemon", "app.js" ]

FROM dev as test
COPY --chown=node:node . .
RUN npm audit 

FROM test as pre-prod
USER root
RUN rm -rf ./tests && rm -rf ./node_modules

FROM base as prod
COPY --from=pre-prod /app /app
HEALTHCHECK CMD curl http://127.0.0.1/ || exit 1
USER node





