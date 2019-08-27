""" Production Settings """

import os
from backend.settings.dev import *

BASE_URL = "https://thessa-dev.southeastasia.cloudapp.azure.com"

############
# DATABASE #
############
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'thessadb_dev',
        'USER': 'thessaadmin',
        'PASSWORD': 'Passw0rdW4rcraft!@#$',
        'HOST': 'localhost',
        'PORT': '5432'
    }
}


############
# SECURITY #
############

DEBUG = False

SECRET_KEY = 'lc0wj43wq_hxyi@0mbjmk&89s&=*cl3%4ej-2=k_owcf+2d8d6'

# Set to your Domain here (eg. 'django-vue-template-demo.herokuapp.com')
ALLOWED_HOSTS = ['thessa-dev.southeastasia.cloudapp.azure.com', 'www.thessa-dev.southeastasia.cloudapp.azure.com']
