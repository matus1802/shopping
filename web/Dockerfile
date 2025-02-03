FROM node:16-bullseye-slim AS builder

RUN apt-get update && \
    apt-get install -y python3 python3-pip

WORKDIR /app

COPY . /app/

RUN npm ci

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "preview" ]
