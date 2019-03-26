from django.urls import include, path

from rest_framework import routers
from .views import ExamViewSet, RoomSessionAPI

router = routers.DefaultRouter()
router.register('', ExamViewSet, base_name='exams')

urlpatterns = [
    path('get_room_session/', RoomSessionAPI.as_view()),
    path('', include(router.urls))
]