from rest_framework import routers
from django.urls import path, include

from .views import ExamViewSet

router = routers.DefaultRouter()
router.register('exams', ExamViewSet, base_name='siput')

urlpatterns = router.urls