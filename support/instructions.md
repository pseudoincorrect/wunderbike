# INSTRUCTIONS TO DEPLOY WUNDERBIKE LOCALLY

## Backend, test it with Jest

```console
$ cd $WUNDERBIKE_REPO_ROOT
$ cd backend
$ npm run test_clear_cache
$ npm run test
```

## Frontend, add the secrets

```console
$ cd $WUNDERBIKE_REPO_ROOT
$ cd frontend/wunderbike
$ touch .env.local
$ nano .env.local
# fil in the file with the provided secrets in mail
```

## Scripts, get an access token

```console
$ cd $WUNDERBIKE_REPO_ROOT
$ cd scripts/secrets
$ touch secrets.js
$ nano secrets.js
# fil in the file with the provided secrets in mail
$ cd ..
$ npm run get_token
```

## Deploy locally, with Docker

```console
$ cd $WUNDERBIKE_REPO_ROOT
$ cd docker
$ docker-compose up
```

## Add a few tricks, with Postman

## Test manually

open a browser to "http://localhost:80"
click on login and create a user
click on "tricks" button to view tricks

# HOW TO CONTINUE DEVELOPING

The development part is not made in docker containers themselves.
Instead, we simply launch local servers.
One for the express backend and one for the nextjs frontend.
The development is made on Windows 11 thus to develop on Linux (or Mac),
you would need to modify the package.json of both front and backend.
(Simply because of the environment variable, we can make it cross platform with a npm package if needed)

## Backend development

To launch a nodemon process and work on the code, run the following commands

```console
$ cd $WUNDERBIKE_REPO_ROOT
$ cd backend
$ npm run dev
```

The environment is automatically chosen between development and production.
Here we would be in the development one.

## Frontend development

To launch a nextjs development server, run the following commands

```console
$ cd $WUNDERBIKE_REPO_ROOT
$ cd frontend/wunderbike
$ npm run dev
```

Open a browser on "http://localhost:80" to see the result and hot reloading pages.
