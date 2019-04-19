# Siputapp
Web Apps for Thesis Examinations

### Includes

* Django
* Django REST framework
* Django Whitenoise, CDN Ready
* Vue CLI 3
* Vue Router
* Vuex
* Gunicorn
* Configuration for Heroku Deployment


### Template Structure


| Location             |  Content                                   |
|----------------------|--------------------------------------------|
| `/backend`           | Django Project & Backend Config            |
| `/backend/api`       | Django App (`/api`)                        |
| `/src`               | Vue App .                                  |
| `/src/main.js`       | JS Application Entry Point                 |
| `/public/index.html` | Html Application Entry Point (`/`)         |
| `/public/static`     | Static Assets                              |
| `/dist/`             | Bundled Assets Output (generated at `npm run build`) |

## Prerequisites

Before getting started you should have the following installed and running:

- [X] NPM - [instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [X] Vue CLI 3 - [instructions](https://cli.vuejs.org/guide/installation.html)
- [X] Python 3 - [instructions](https://wiki.python.org/moin/BeginnersGuide)
- [X] Pipenv - [instructions](https://pipenv.readthedocs.io/en/latest/install/#installing-pipenv)

## Setup Template

```
$ npm install
$ pipenv install --dev && pipenv shell
$ python manage.py migrate
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

The dual dev server setup allows you to take advantage of
webpack's development server with hot module replacement.
Proxy config in [`vue.config.js`](/vue.config.js) is used to route the requests
back to django's API on port 8000.

If you would rather run a single dev server, you can run Django's
development server only on `:8000`, but you have to build build the Vue app first
and the page will not reload on changes.

```
$ npm run build
$ python manage.py runserver
```


## Deploy

* Set `ALLOWED_HOSTS` on [`backend.settings.prod`](/backend/settings/prod.py)

### Heroku Server

```
$ heroku apps:create django-vue-template-demo
$ heroku git:remote --app django-vue-template-demo
$ heroku buildpacks:add --index 1 heroku/nodejs
$ heroku buildpacks:add --index 2 heroku/python
$ heroku addons:create heroku-postgresql:hobby-dev
$ heroku config:set DJANGO_SETTINGS_MODULE=backend.settings.prod
$ heroku config:set DJANGO_SECRET_KEY='...(your django SECRET_KEY value)...'

$ git push heroku
```

Heroku's nodejs buildpack will handle install for all the dependencies from the [`package.json`](/package.json) file.
It will then trigger the `postinstall` command which calls `npm run build`.
This will create the bundled `dist` folder which will be served by whitenoise.

The python buildpack will detect the [`Pipfile`](/Pipfile) and install all the python dependencies.

The [`Procfile`](/Procfile) will run Django migrations and then launch Django'S app using gunicorn, as recommended by heroku.

## Static Assets

See `settings.dev` and [`vue.config.js`](/vue.config.js) for notes on static assets strategy.

This template implements the approach suggested by Whitenoise Django.
For more details see [WhiteNoise Documentation](http://whitenoise.evans.io/en/stable/django.html)

It uses Django Whitenoise to serve all static files and Vue bundled files at `/static/`.
While it might seem inefficient, the issue is immediately solved by adding a CDN
with Cloudfront or similar.
Use [`vue.config.js`](/vue.config.js) > `baseUrl` option to set point all your assets to the CDN,
and then set your CDN's origin back to your domains `/static` url.

Whitenoise will serve static files to your CDN once, but then those assets are cached
and served directly by the CDN.

This allows for an extremely simple setup without the need for a separate static server.

[Cloudfront Setup Wiki](https://github.com/gtalarico/django-vue-template/wiki/Setup-CDN-on-Cloud-Front)

** this project template is adapted from [https://github.com/gtalarico/django-vue-template](https://github.com/gtalarico/django-vue-template)

## API Endpoints
Endpoint untuk umum:
1. **POST** /api/auth/login/
```JSON
{
	"email": "ridi.ferdiana@mail.ugm.ac.id",
	"password": "Passw0rd"
}
```

1. **POST** /api/auth/logout/
1. **POST** /api/auth/change_password/
```JSON
{
	"password1": "Passw0rd",
	"password2": "Passw0rd"
}
```

1. **GET** /api/users/ atau /api/users/dosen/ atau /api/users/akademik/ : list all users / list dosen users / list akademik users
1. **POST** /api/users/dosen/ atau /api/users/akademik/ : create dosen users / create akademik users
```JSON
{
	"nama": "Ridi Ferdiana",
	"email": "ridi.ferdiana@mail.ugm.ac.id",
	"prodi": "TI",
	"konsentrasi": "RPL",
	"nip": "1998274172469128111",
	"password": "Passw0rd"
}
```

1. **GET** /api/exams/ : list all exams
1. **GET** /api/exams/get_room_session/ : list room and session
1. **POST** /api/exams/ : create exams
```JSON
{
	"tanggal": "2019-06-12",
	"sesi": 2,
	"ruang": 1,
	"skripsi": {
		"judul": "Pengembangan Aplikasi Disabilitas",
		"intisari": "Ini adalah intisari dari aplikasi ini...",
		"naskah": "http://localhost:8000/api/exams/skripsi/Thesis_Exam_Dev_Based_On_OBA.pdf",
		"pembimbing_satu": 3,
		"pembimbing_dua": 4,
		"is_capstone": true,
		"mahasiswa": [
			{
				"nama": "Muhammad Ashil Al Lathief",
				"nim": "15/385406/TK/44068",
				"prodi": "Teknologi Informasi",
				"konsentrasi": "Rekayasa Perangkat Lunak",
				"tempat_lahir": "Purwokerto",
				"tanggal_lahir": "1996-10-31",
				"telepon": "087738305630"
			},
			{
				"nama": "Muhammad Edward Chakin",
				"nim": "15/385407/TK/44069",
				"prodi": "Teknologi Informasi",
				"konsentrasi": "Rekayasa Perangkat Lunak",
				"tempat_lahir": "Solo",
				"tanggal_lahir": "1997-05-21",
				"telepon": "08234785324"
			},
			{
				"nama": "Steven Amadeus",
				"nim": "15/385456/TK/44078",
				"prodi": "Teknologi Informasi",
				"konsentrasi": "Rekayasa Perangkat Lunak",
				"tempat_lahir": "Jakarta",
				"tanggal_lahir": "1996-01-01",
				"telepon": "085632162427"
			}
		]
	},
	"penguji": [
		{
			"dosen": 2
		},
		{
			"dosen": 5
		}
	]
}
```

1. **GET** /api/exams/\<id>\/ : retrive an exam
1. **POST** /api/exams/\<id>\/penguji/ : create penguji for selected exam
```JSON
{
	"dosen": 4
}
```


1. **GET** /api/me/exams/
1. **GET** /api/me/exams/\<id>\/
1. **POST** /api/me/exams/\<id>\/terima/ atau /api/me/exams/\<id>\/tolak/
1. **GET** /api/me/exams/\<id>\/essays/ : retrieve essays detail for selected exam
1. **GET** /api/me/exams/\<id>\/comments/ : list all comments
1. **POST** /api/me/exams/\<id>\/comments/ : create a comment
```JSON
{
	....
}
```

1. **GET** /api/me/exams/\<id>\/students/ : List all students for selected exam
1. **GET** /api/me/exams/\<id>\/grades/ : list all grades
1. **POST** /api/me/exams/\<id>\/grades/ : create grades for students
```JSON
	...
```

1. **GET** /api/me/profile/ 
1. **PUT** /api/me/profile/
1. **GET** /api/me/exams/history/


