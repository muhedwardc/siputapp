from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from .api.views import index_view, MessageViewSet
from .users.views import LoginAPI
from knox.views import LogoutView


router = routers.DefaultRouter()
router.register('messages', MessageViewSet)

urlpatterns = [

    # http://localhost:8000/
    path('', index_view, name='index'),

    # http://localhost:8000/api/auth/login
    path('api/auth/login/', LoginAPI.as_view()),

    # http://localhost:8000/api/auth/login
    path('api/auth/login/', LogoutView.as_view()),

    # http://localhost:8000/api/users/
    path('api/users/', include('backend.users.urls')),

    # http://localhost:8000/api/exams/
    path('api/exams/', include('backend.exams.urls')),

    # http://localhost:8000/api/me/
    path('api/me/', include('backend.siput.urls')),

    # http://localhost:8000/api/<router-viewsets>
    path('api/', include(router.urls)),

    # http://localhost:8000/api/admin/
    path('admin/', admin.site.urls),
]

