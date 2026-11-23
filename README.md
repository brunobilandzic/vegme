# Vegme
## Application for *peer-to-peer* meal subscriptions

Vegme is an *peer-to-peer* meal subscriptions app. It allows cooks to make different meals and users to subscribe to them on a weekly basis.

## Public demo

The static demo lets visitors browse fictional meals, save a practice weekly plan, and switch to the cook workspace to add or remove meals from the demo menu. It stores changes in the current browser. The portfolio demo does not require a server or service credentials.

For a local preview, install the client dependencies and start React with `REACT_APP_PUBLIC_DEMO=true`. Build it with the same environment variable to publish `client/build`. The root `render.yaml` defines a free Render Static Site.

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

#Authorization

Regular Role User:

- username: regular441
- password: password

Cook Role User:

- username: cook361
- password: password
