import datetime
from django.shortcuts import render
from rest_framework import viewsets, views, permissions, status, mixins
from rest_framework.response import Response
from rest_framework.decorators import action

from .serializers import UjianSerializer, CreateUjianSerializer, SimpleUjianSerializer, ListRoomSerializer, ListSessionSerializer, PengujiSerializer, FullPengujiSerializer, ChangePengujiSerializer
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

    @action(detail=True)
    def penguji(self, request):
        exam = self.get_object()
        list_penguji = exam.penguji.all()
        serializer = PengujiSerializer(list_penguji, many=True)
        return Response(serializer.data)

class PengujiViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    queryset = Penguji.objects.all()
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)

    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'retrieve':
            return FullPengujiSerializer
        elif self.action == 'update':
            return ChangePengujiSerializer
        else:
            return PengujiSerializer

    def update(self, request, *args, **kwargs):
        penguji = self.get_object()
        serializer = self.get_serializer(penguji, data=request.data)
        if serializer.is_valid():
            new_penguji = serializer.save()
            return Response(FullPengujiSerializer(new_penguji).data)

        return Response(serializer.errors)


class RoomSessionAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)

    def get(self, request, format=None):
        list_room = Room.objects.all()
        list_session = Session.objects.all()
        return Response({
            "Sesi": ListSessionSerializer(list_session, many=True).data,
            "Ruang": ListRoomSerializer(list_room, many=True).data
        })

