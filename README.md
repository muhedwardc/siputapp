# THESSA
Thesis Examination Information System

## Prerequisites

Before getting started you should have the following installed and running:

- [X] NPM - [instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [X] Vue CLI 3 - [instructions](https://cli.vuejs.org/guide/installation.html)
- [X] Python 3 - [instructions](https://wiki.python.org/moin/BeginnersGuide)
- [X] Pipenv - [instructions](https://pipenv.readthedocs.io/en/latest/install/#installing-pipenv)

## Setup Project
1. Clone this repository
2. Create new file `backend/settings/configs.py` and copy code from `backend/settings/configs.py.local` for development purpose
3. Create new file `.env` and and insert code from `.env.development` for development purpose
4. Run the following command in your terminal of choice
```
$ npm install
$ pipenv install --dev && pipenv shell
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py createsuperuser
$ python manage.py loaddata session_data.json
$ python manage.py loaddata room_data.json
$ python manage.py loaddata so_data.json
```

## Running Development Servers

```
$ python manage.py runserver
```

From another tab in the same directory:

```
$ npm run serve
```

The Vue application will be served from [`localhost:8080`](http://localhost:8080/) and the Django API
and static files will be served from [`localhost:8000`](http://localhost:8000/).


If you would rather run a single dev server, you can run Django's
development server only on `:8000`, but you have to build the Vue app first
and the page will not reload on changes.

```
$ npm run build
$ python manage.py runserver
```

## Deployment Guide
**For deployment please change current .env and configs.py file with your real production configuration**, you can see **.env.example** and **config.py.example** for references.
Tutorial to deploy this project to cloud virtual server can be learn here:
https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-18-04



** this project template is adapted from [https://github.com/gtalarico/django-vue-template](https://github.com/gtalarico/django-vue-template)
