# development
FROM node:20.11.0 as dev

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

USER root

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

# build
FROM node:20.11.0 as build

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

USER root

WORKDIR /app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=dev /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build
RUN npm ci --only=production && npm cache clean --force

USER node

# production
FROM node:20.11.0 as prod

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

CMD ["npm", "run", "start:prod"]