from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers

from .api.views import index_view, MessageViewSet
from .users.views import LoginAPI, ChangePasswordAPI, LoginGoogle
from knox.views import LogoutView


router = routers.DefaultRouter()
router.register('messages', MessageViewSet)

urlpatterns = [

    # http://localhost:8000/api/auth/login/
    path('api/auth/login/', LoginAPI.as_view()),

    # http://localhost:8000/api/auth/logout/
    path('api/auth/logout/', LogoutView.as_view()),

    # http://localhost:8000/api/auth/change_password/
    path('api/auth/change_password/', ChangePasswordAPI.as_view()),

    path('api/auth/login-google/', LoginGoogle.as_view()),

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

    # http://localhost:8000/
    re_path(r'^.*', index_view, name='index'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

