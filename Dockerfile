FROM node:18-alpine

LABEL Developers="Robin Augereau"

WORKDIR /app

COPY --chown=node:node . .

RUN yarn
RUN yarn build

RUN rm -rf src/ static/ Dockerfile

USER node:node

EXPOSE 3000

CMD ["node","build/index.js"]