from django.shortcuts import render
from rest_framework import viewsets, views
from rest_framework.response import Response

from .serializers import UjianSerializer, CreateUjianSerializer, SimpleUjianSerializer, ListRoomSerializer, ListSessionSerializer
from .models import Exam, Penguji, Room, Session

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()

    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'create':
            return CreateUjianSerializer
        elif self.action == 'retrieve':
            return UjianSerializer
        return SimpleUjianSerializer

class RoomSessionAPI(views.APIView):
    def get(self, request, format=None):
        list_room = Room.objects.all()
        list_session = Session.objects.all()
        return Response({
            "Sesi": ListSessionSerializer(list_session, many=True).data,
            "Ruang": ListRoomSerializer(list_room, many=True).data
        })

