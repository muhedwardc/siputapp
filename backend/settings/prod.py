""" Production Settings """

import os
from .dev import *

BASE_URL = "https://thessa-dev.southeastasia.cloudapp.azure.com"

############
# DATABASE #
############
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.getenv('DATABASE_NAME', ''),
        'USER': os.getenv('DATABASE_USER', ''),
        'PASSWORD': os.getenv('DATABASE_PASSWORD', ''),
        'HOST': os.getenv('DATABASE_HOST', ''),
        'PORT': os.getenv('DATABASE_PORT', '')
    }
}


############
# SECURITY #
############

DEBUG = False

SECRET_KEY = os.getenv('SECRET_KEY', SECRET_KEY)

# Set to your Domain here (eg. 'django-vue-template-demo.herokuapp.com')
ALLOWED_HOSTS = ['*']
