from django.urls import include, path, re_path

from rest_framework import routers
from .views import ExamViewSet, RoomSessionAPI, RoomViewSet, SessionViewSet

router = routers.DefaultRouter()
router.register('', ExamViewSet, base_name='exams')

urlpatterns = [
    path('get_room_session/', RoomSessionAPI.as_view()),
    path('rooms/', RoomViewSet.as_view({'get': 'list', 'post': 'create_room'})),
    path('rooms/<pk>/', RoomViewSet.as_view({'put': 'edit_room'})),
    path('sessions/', SessionViewSet.as_view({'get': 'list', 'post': 'create_session'})),
    re_path(r'^upload-skripsi/(?P<filename>[^/]+)$', ExamViewSet.as_view({'post': 'upload_skripsi'})),
    path('', include(router.urls)),
]