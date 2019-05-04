from django.urls import include, path

from rest_framework import routers
from .views import ExamViewSet, RoomSessionAPI, RoomViewSet, SessionViewSet

router = routers.DefaultRouter()
router.register('', ExamViewSet, base_name='exams')

urlpatterns = [
    path('get_room_session/', RoomSessionAPI.as_view()),
    path('rooms/', RoomViewSet.as_view({'get': 'list', 'post': 'create_room'})),
    path('sessions/', SessionViewSet.as_view({'get': 'list', 'post': 'create_session'})),
    path('', include(router.urls)),
]