import os

SETTINGS_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_DIR = os.path.dirname(SETTINGS_DIR)

BASE_URL = "http://localhost:8000"

############
# SECURITY #
############

DEBUG = True
SECRET_KEY = '(@hdr7i)!ewki!$_%o+z&1up_poq02mo5s$kd!8(2j%m_&mjv#'


############
# DATABASE #
############

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Set to your Domain here (eg. 'django-vue-template-demo.herokuapp.com')
ALLOWED_HOSTS = ['*']
