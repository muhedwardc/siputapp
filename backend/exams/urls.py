from django.urls import include, path

from rest_framework import routers
from .views import ExamViewSet, RoomSessionAPI, PengujiViewSet

router = routers.DefaultRouter()
router.register('', ExamViewSet, base_name='exams')
router.register('penguji', PengujiViewSet, base_name='penguji')

urlpatterns = [
    path('get_room_session/', RoomSessionAPI.as_view()),
    path('', include(router.urls)),
    # path('<int:year>/<int:month>/<int:date>/', ListExamByDate.as_view()),

]