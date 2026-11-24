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

## Public demo on Vercel

Set the Vercel project's **Root Directory** to `client`. The included
`client/vercel.json` runs the production build, serves `build`, and lets React
Router handle direct visits and refreshes on nested routes. Vercel
automatically provides HTTPS for the frontend. The build command sets
`REACT_APP_STATIC_DEMO=true` and uses `CI=false` to keep existing lint
warnings visible.

The demo opens the meal catalog immediately. Visitors can browse sample
meals and cooks, add meals to the cart, and complete a simulated order in
their browser. The build includes the sample data and needs no login,
backend, database, or Vercel dashboard environment variables.

To preview the same mode in PowerShell from `client`:

```powershell
$env:REACT_APP_STATIC_DEMO = 'true'
npm.cmd start
```

For the full application, leave `REACT_APP_STATIC_DEMO` unset or set it
to `false` and configure the API as shown in `client/.env.example`.

#Authorization

Regular Role User:

- username: regular441
- password: password

Cook Role User:

- username: cook361
- password: password
