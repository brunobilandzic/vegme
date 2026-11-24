# Vegme
## Application for *peer-to-peer* meal subscriptions

Vegme is an *peer-to-peer* meal subscriptions app. It allows cooks to make different meals and users to subscribe to them on a weekly basis.

## Roles

- **Cook** - CRUD upon meals and orders
- **Regular** - CRUD upon orders, browsing meals.
- **Aministrator** - CRUD upon everything, including users and roles

## Instructions to run the app

- clone this repo

Backend:
- cd backend
- npm install
- create .env file with values shown in .env.example
- you can ignore email_password, email and verification_hash_key
- create a mongoDb account if you dont have one
- put *mongodb+srv://[username]:[password]@custer0.5teiq.mongodb.net/[db_name]?retryWrites=true&w=majority* in mongo_connection_string with your username, password and wished db_name
- seed the database, you will have to run npm start 3 times
- After first npm start, wait up to 30 sec for logging to start.
- After stop of console logging, restart the app 
- Again, wait and after stop of console logging, restart the app
- Wait and after stop of console logging, the app is working
- type *https://localhost:5000* in your browser and click *proceed to localhost* for SSL setup

Frontend:
- cd client
- npm install
- create .env file with values shown in .env.example
- put *https://localhost:5000/api* in react_app_root_url field and *true* in https field
- npm start
- proceed to localhost

## Vercel demo

Set the Vercel project's **Root Directory** to `client`. The included
`client/vercel.json` runs the production build, serves `build`, and lets React
Router handle direct visits and refreshes on nested routes. Vercel
automatically provides HTTPS for the frontend. The demo build uses
`CI=false` so Create React App reports existing lint warnings without
failing the build.

Set `REACT_APP_ROOT_URL=https://api.example.com/api` for each Vercel
environment used for the demo. Replace the example host with the public
HTTPS URL of the backend and omit the trailing slash. The frontend uses
that URL for API requests and its origin for Socket.IO. Vercel embeds the
variable at build time, so redeploy after changing it. `HTTPS=true` is
used by the local development server.

Run the Express and Socket.IO backend on a separate host with public
HTTPS. Set `NODE_ENV=production`, `MONGO_CONNECTION_STRING`,
`COOKIE_KEY` (a private random value), and `CLIENT_URL` (the exact
frontend origin, for example `https://vegme.vercel.app`, without a
trailing slash). Use a stable frontend origin for the demo because the
backend permits that origin in its CORS settings.

Use the local demo accounts below. Google OAuth still uses localhost
callbacks and redirects. If the frontend and API are on different sites,
demo sign-in also requires a browser that permits cross-site cookies for
the API.

#Authorization

Regular Role User:

- username: regular441
- password: password

Cook Role User:

- username: cook361
- password: password
