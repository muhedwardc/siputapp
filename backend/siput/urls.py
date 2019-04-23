from rest_framework import routers
from django.urls import path, include

from .views import SiputExamViewSet

router = routers.DefaultRouter()
router.register('exams', SiputExamViewSet, base_name='siput')

urlpatterns = router.urls