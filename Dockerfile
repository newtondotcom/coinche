FROM node:18-alpine

LABEL Developers="Robin Augereau"

WORKDIR /app

COPY --chown=node:node . .

RUN pnpm install
RUN pnpm build

RUN rm -rf src/ static/

USER node:node

EXPOSE 3000

CMD ["node","build/index.js"]