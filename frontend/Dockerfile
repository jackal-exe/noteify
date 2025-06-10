FROM node:20-alpine AS builder

WORKDIR /frontend-builder
COPY . .

RUN npm ci
RUN npm run build

FROM node:20-alpine

RUN npm i -g serve
WORKDIR /frontend
COPY --from=builder /frontend-builder/dist /frontend/dist

ENTRYPOINT ["serve", "-s", "dist"]
CMD ["-p", "3000"]

EXPOSE 3000