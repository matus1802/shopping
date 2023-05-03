# Shopping

How to start:

1. with docker
   To start the project using docker, just run here `docker compose build` and `docker compose up`. Wait until the browser will open localhost:3000.

2. without docker

- start mongodb locally
- set mongodb uri to `/api/env.dev`
- run in /api `npm run build` and `npm run start`
- seed database by `npm run seed:refresh:dev`
- run in /web `npm run dev`
- open localhost:3000 in Browser

After first run, you should be redirected to login page. There is a link to signup page. Create account.
Use this account to login. After login, you should see mocked items. Buy items.
Always 2 pieces of item in stock. When you add item to cart, the number of it in stock is decreased.
Items are restocked after successful buy.

You can run API e2e tests with /api `npm run test:e2e`
