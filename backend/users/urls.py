from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, RoleAPI

router = routers.DefaultRouter()
router.register('', UserViewSet, base_name='users')


urlpatterns = [
    path('roles/', RoleAPI.as_view()),
    path('', include(router.urls))
]
