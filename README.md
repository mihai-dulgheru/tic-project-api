# Express Firestore API starter

Starter for Node Express API projects with Firestore database.

## Documentation and wiki

## Quick start

Install dependencies

```bash
npm ci
```

Copy the example environment variables

```bash
cp .env.example .env
```

Add your Firestore key to the folder `firebase\key` and import it in `functions\initialize-firestore.js`

Optional: Add seeds to your Firestore database

```bash
npm run seed
```

Start the local server

```bash
npm run dev
```

## Features

### Logger

You can use the logger from lib folder to log anything with different logging levels.

By default the logs will not be enabled on production environments.
To overwrite this behavior use the `LOG_EVERYWHERE` environment variable and set its value to `"yes"`.

### Loading and error states

You can append these query params to any route in this API:

- use `&test=loading&wait=5000` to delay any request with 5 seconds
- use `&test=error` to trigger a failed request

Customize the loading time with the `wait` query param which takes the number of milliseconds you want to wait.

This feature is available only for dev environments.

### reCAPTCHA

You should use the reCAPTCHA middleware on any public route.
Moreover, you should skip reCAPTCHA middleware and validation on any private route.

By default reCAPTCHA will not be enabled when the request has no origin (it is sent through an API).

### Postman collection

You can use the Postman collection from the `postman` folder to explore the API and its routes.

## Further reading

- [https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api](https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
- [https://hasura.io/blog/best-practices-of-using-jwt-with-graphql](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql)
