from rest_framework import routers
from django.urls import path, include

from .views import SiputExamViewSet, SiputProfileViewSet

router = routers.DefaultRouter()
router.register('exams', SiputExamViewSet, base_name='exams')

urlpatterns = [
    path('', include(router.urls)),
    path('profile/', SiputProfileViewSet.as_view({"get": "profile", "put": "edit_profile"}))
]