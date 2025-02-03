# Shopping

How to start:

**With docker**

To start the project using docker, just run here `docker compose build` and `docker compose up`. Wait until the browser will open localhost:3000.

**Without docker**

- start mongodb locally
- set mongodb uri to `/api/env.dev`
- run in /api `npm run build` and `npm run start`
- seed database by `npm run seed:refresh:dev`
- run in /web `npm run dev`
- open http://localhost:3000 in your browser

**Result**

1. After the first run, the user should be redirected to the login page.
2. The login page includes a link to the signup page.
3. The user must create an account and use it to log in.
4. After logging in, the user can see mocked items available for purchase.
5. Each item always starts with 2 pieces in stock.
6. When an item is added to the cart, its stock decreases accordingly.
7. After a successful purchase, items are restocked.

**Tests**

You can run API e2e tests with /api `npm run test:e2e`
