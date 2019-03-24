from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet

router = routers.DefaultRouter()
router.register('', UserViewSet, base_name='users')


urlpatterns = router.urls
