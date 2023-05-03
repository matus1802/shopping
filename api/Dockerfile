FROM node:16.13.2-alpine3.14 AS builder

WORKDIR /app

COPY . /app/

RUN npm ci

RUN npm run build

FROM node:16.13.2-alpine3.14 as api

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 8080

CMD ["npm", "run", "seed:and:start"]
