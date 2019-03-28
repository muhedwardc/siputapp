from rest_framework import routers
from django.urls import path, include

from .views import SiputViewSet, UserProfileAPI

router = routers.DefaultRouter()
router.register('ujian', SiputViewSet, base_name='siput')

urlpatterns = [
    path('', include(router.urls)),
    path('profile/', UserProfileAPI.as_view())
]