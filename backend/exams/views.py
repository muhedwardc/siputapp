import datetime
from django.shortcuts import render
from django.db.models import Count, Q
from rest_framework import viewsets, views, permissions, status, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser

from .serializers import RoomSerializer, SessionSerializer, ExamSerializer, ListExamSerializer, CreateExamSerializer, PengujiSerializer, CreatePengujiSerializer
from .models import Exam, Penguji, Room, Session
from backend.pagination import CustomPagination

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)
    parser_classes = (JSONParser, FormParser, MultiPartParser)
    pagination_class = CustomPagination

    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'create':
            return CreateExamSerializer
        elif self.action == 'list':
            return ListExamSerializer
        else:
            return ExamSerializer

    def list(self, request, *args, **kwargs):
        if 'start_date' in request.GET and 'end_date' in request.GET:
            start_date = request.GET.get('start_date')
            end_date = request.GET.get('end_date')
            exams = self.get_queryset().filter(tanggal__range=(start_date, end_date))
            page = self.paginate_queryset(exams)
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        elif 'date' in request.GET:
            date = request.GET.get('date')
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


class RoomSessionAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)

    def get(self, request, format=None):
        if 'date' in request.GET:
            date = request.GET.get('date', '')
            exam_for_date = Count('exams', filter=Q(tanggal=date))
            list_room = Room.objects.all().annotate(total_exam_in_room=exam_for_date)
            list_session = Room.objects.all().annotate(total_exam_in_session=exam_for_date)

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

