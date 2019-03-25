from rest_framework import routers
from .views import ExamViewSet

router = routers.DefaultRouter()
router.register('', ExamViewSet, base_name='exams')

urlpatterns = router.urls