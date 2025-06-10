FROM node:20-alpine AS builder

WORKDIR /backend-builder
COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

FROM node:20-alpine

WORKDIR /backend
COPY package.json yarn.lock ./
COPY --from=builder /backend-builder/dist /backend/dist

RUN yarn --production --frozen-lockfile

ENTRYPOINT ["node", "dist/main.js"]

EXPOSE 8800