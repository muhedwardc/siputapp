from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, PengelolaViewSet

router = routers.DefaultRouter()
router.register('pengelola', PengelolaViewSet, base_name='pengelola')
router.register('', UserViewSet, base_name='users')

urlpatterns = router.urls