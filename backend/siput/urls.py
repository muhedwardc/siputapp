from rest_framework import routers
from django.urls import path, include

from .views import SiputViewSet

router = routers.DefaultRouter()
router.register('', SiputViewSet, base_name='siput')

urlpatterns = router.urls