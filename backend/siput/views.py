from rest_framework import viewsets, mixins, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import SiputPengujiSerializer, ListSiputPengujiSerializer
from backend.essays.serializers import EssaySerializer, StudentSerializer
from backend.comments.serializers import CommentSerializer, CreateCommentSerializer
from backend.grades.serializers import GradeSerializer, CreateGradeSerializer
from backend.exams.models import Penguji, Exam
from backend.comments.models import Comment
from backend.pagination import CustomPagination


class SiputExamViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = SiputPengujiSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        return self.request.user.exams.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ListSiputPengujiSerializer
        else:
            return SiputPengujiSerializer


    def list(self, request):
        list_exam = self.get_queryset().exclude(ujian__status=3)
        page = self.paginate_queryset(list_exam)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    @action(methods=['POST'], detail=True)
    def present(self, request, *args, **kwargs):
        penguji = self.get_object()
        penguji.is_present = True
        penguji.save()
        return Response({
            'msg': 'status kehadiran berhasil diubah.'
        })
    
    @action(methods=['POST'], detail=True)
    def start_exam(self, request, *args, **kwargs):
        penguji = self.get_object()
        if penguji.is_leader != True:
            return Response({
                'msg': 'Anda tidak memiliki otorisasi untuk memulai ujian.'
            })

        ujian = penguji.ujian
        ujian.status = 2
        ujian.save()
        return Response({
            'msg': 'status ujian berhasil diubah.'
        })
    
    @action(methods=['POST'], detail=True)
    def finish_exam(self, request, *args, **kwargs):
        penguji = self.get_object()
        if penguji.is_leader != True:
            return Response({
                'msg': 'Anda tidak memiliki otorisasi untuk mengakhiri ujian.'
            })

        ujian = penguji.ujian
        ujian.status = 3
        ujian.save()
        return Response({
            'msg': 'status ujian berhasil diubah.'
        })

    @action(detail=False)
    def history(self, request, *args, **kwargs):
        list_finished_exam = self.get_queryset().filter(ujian__status=3)
        page = self.paginate_queryset(list_finished_exam)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    @action(detail=True)
    def essays(self, request, *args, **kwargs):
        skripsi = self.get_object().ujian.skripsi
        serializer = EssaySerializer(skripsi)
        return Response(serializer.data)
    
    @action(detail=True)
    def students(self, request, *args, **kwargs):
        students = self.get_object().ujian.skripsi.students
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    @action(detail=True)
    def comments(self, request, *args, **kwargs):
        # skripsi = self.get_object().ujian.skripsi
        comments = self.get_object().comments
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    @comments.mapping.post
    def add_comment(self, request, *args, **kwargs):
        skripsi = self.get_object().ujian.skripsi
        serializer = CreateCommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(skripsi=skripsi, penguji=self.get_object())

        comments = self.get_object().comments
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @comments.mapping.put
    def edit_comment(self, request, *args, **kwargs):
        comment = self.get_object().comments.get(pk=request.data['id'])
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            comments = self.get_object().comments
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True)
    def grades(self, request, *args, **kwargs):
        grades = self.get_object().grades
        serializer = GradeSerializer(grades, many=True)
        return Response(serializer.data)

    @grades.mapping.post
    def add_grades(self, request, *args, **kwargs):
        grades = []
        for data in request.data['grades']:
            serializer = CreateGradeSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save(penguji=self.get_object())
            grades.append(serializer.data)
        
        return Response({"grades": grades}, status=status.HTTP_201_CREATED)
