import datetime
from django.shortcuts import render
from rest_framework import viewsets, views, permissions
from rest_framework.response import Response

from .serializers import UjianSerializer, CreateUjianSerializer, SimpleUjianSerializer, ListRoomSerializer, ListSessionSerializer
from .models import Exam, Penguji, Room, Session

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)

    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'create':
            return CreateUjianSerializer
        elif self.action == 'retrieve':
            return UjianSerializer
        return SimpleUjianSerializer

    def list(self, request):
        if 'start_date' in request.GET and 'end_date' in request.GET:
            start_date = request.GET.get('start_date')
            end_date = request.GET.get('end_date')
            exams = self.get_queryset().filter(tanggal__range=(start_date, end_date))
            serializer = self.get_serializer(exams, many=True)
            return Response(serializer.data)

        exams = self.get_queryset()
        serializer = self.get_serializer(exams, many=True)
        return Response(serializer.data)


# class ListExamByDate(views.APIView):
#     def get(self, request, date, month, year, format=None):
#         list_ujian = Exam.objects.all().filter(tanggal=datetime.date(year, month, date))
#         return Response(SimpleUjianSerializer(list_ujian, many=True).data)

class RoomSessionAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)

    def get(self, request, format=None):
        list_room = Room.objects.all()
        list_session = Session.objects.all()
        return Response({
            "Sesi": ListSessionSerializer(list_session, many=True).data,
            "Ruang": ListRoomSerializer(list_room, many=True).data
        })

