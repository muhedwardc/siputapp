import datetime
from django.core.files.storage import FileSystemStorage
from django.db.models import Count, Q
from django.conf import settings
from rest_framework import viewsets, views, permissions, status, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser, FileUploadParser

from .serializers import RoomSerializer, SessionSerializer, ExamSerializer, ListExamSerializer, CreateExamSerializer, PengujiSerializer, CreatePengujiSerializer, CreateRoomSerializer, CreateSessionSerializer, UploadEssaySerializer
from .models import Exam, Penguji, Room, Session
from backend.pagination import CustomPagination


class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)
    parser_classes = (JSONParser, FormParser, MultiPartParser, FileUploadParser)
    pagination_class = CustomPagination

    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'create':
            return CreateExamSerializer
        elif self.action == 'list':
            return ListExamSerializer
        else:
            return ExamSerializer

    def list(self, request, *args, **kwargs):
        if 'mulai' in request.GET and 'selesai' in request.GET:
            mulai = request.GET.get('mulai')
            selesai = request.GET.get('selesai')
            exams = self.get_queryset().filter(tanggal__range=(mulai, selesai))
            page = self.paginate_queryset(exams)
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        elif 'tanggal' in request.GET:
            date = request.GET.get('tanggal')
            exams = self.get_queryset().filter(tanggal=date)
            page = self.paginate_queryset(exams)
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        exams = self.get_queryset()
        page = self.paginate_queryset(exams)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            new_ujian = serializer.save()
            return Response(ExamSerializer(new_ujian).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True)
    def penguji(self, request, *args, **kwargs):
        exam = self.get_object()
        list_penguji = exam.penguji.all()
        serializer = PengujiSerializer(list_penguji, many=True)
        return Response(serializer.data)

    @penguji.mapping.post
    def create_penguji(self, request):
        exam = self.get_object()
        serializer = CreatePengujiSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(ujian=exam)
            return Response({
                "msg": "penguji berhasil ditambahkan"
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def upload_skripsi(self, request, filename, format=None):
        upload_location = settings.ESSAY_FILE_LOCATION
        essay_file = request.data['file']
        fs = FileSystemStorage(location=upload_location)
        filename = fs.save(essay_file.name, essay_file)
        file_url = fs.url(filename)
        return Response({
            "file": file_url
        }, status=status.HTTP_201_CREATED)

class RoomSessionAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)

    def get(self, request, format=None):
        if 'date' in request.GET:
            date = request.GET.get('date', '')
            exam_for_date = Count('exams', filter=Q(exams__tanggal=date))
            list_room = Room.objects.all().annotate(total_exam_in_room=exam_for_date)
            list_session = Session.objects.all().annotate(
                total_exam_in_session=exam_for_date)

            return Response({
                "Sesi": SessionSerializer(list_session, many=True).data,
                "Ruang": RoomSerializer(list_room, many=True).data
            })

        list_room = Room.objects.all()
        list_session = Session.objects.all()
        return Response({
            "Sesi": SessionSerializer(list_session, many=True).data,
            "Ruang": RoomSerializer(list_room, many=True).data
        })


class RoomViewSet(viewsets.GenericViewSet):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def list(self, request):
        rooms = self.get_queryset()
        serializer = self.get_serializer(rooms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create_room(self, request):
        serializer = CreateRoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            rooms = self.get_queryset()
            serializer = self.get_serializer(rooms, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def edit_room(self, request, pk=None):
        room = Room.objects.get(pk=pk)
        serializer = CreateRoomSerializer(room, data=request.data)
        if serializer.is_valid():
            serializer.save()
            rooms = self.get_queryset()
            serializer = self.get_serializer(rooms, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete_room(self, request, pk=None):
        try:
            room = Room.objects.get(pk=pk)
        except Room.DoesNotExist:
            return Response({
                "message": "Room with id {} does not exist.".format(pk)
            }, status=status.HTTP_404_NOT_FOUND)

        room.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        

class SessionViewSet(viewsets.GenericViewSet):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

    def list(self, request):
        sessions = self.get_queryset()
        serializer = self.get_serializer(sessions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create_session(self, request):
        serializer = CreateSessionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            sessions = self.get_queryset()
            serializer = SessionSerializer(sessions, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def edit_session(self, request, pk=None):
        try:
            session = Session.objects.get(pk=pk)
        except Session.DoesNotExist:
            return Response({
                "message": "Session with id {} does not exist.".format(pk)
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = CreateSessionSerializer(session, data=request.data)
        if serializer.is_valid():
            serializer.save()
            sessions = self.get_queryset()
            serializer = SessionSerializer(sessions, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete_session(self, request, pk=None):
        try:
            session = Session.objects.get(pk=pk)
        except Session.DoesNotExist:
            return Response({
                "message": "Session with id {} does not exist.".format(pk)
            }, status=status.HTTP_404_NOT_FOUND)

        session.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

