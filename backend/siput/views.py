import json

from django.db.models import Avg, Count, Min, Sum
from django.db.models import FloatField

from rest_framework import viewsets, mixins, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import SiputPengujiSerializer, ListSiputPengujiSerializer
from backend.essays.serializers import EssaySerializer, StudentSerializer
from backend.exams.serializers import RecapExamSerializer
from backend.comments.serializers import CommentSerializer, CreateCommentSerializer
from backend.grades.serializers import GradeSerializer, CreateGradeSerializer, RecapGradeSerializer
from backend.users.serializers import ProfileSerializer

from backend.exams.models import Penguji, Exam
from backend.comments.models import Comment
from backend.users.models import User
from backend.essays.models import Student, Essay, TitleRevision
from backend.grades.models import Grade, StudentOutcome

from backend.pagination import CustomPagination


class SiputExamViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = SiputPengujiSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        return self.request.user.exams.filter(ujian__deleted_at__isnull=True)

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
        list_all_exam = self.get_queryset()
        page = self.paginate_queryset(list_all_exam)
        serializer = ListSiputPengujiSerializer(page, many=True)
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
        students = self.get_object().ujian.skripsi.students.all()
        serializer = GradeSerializer(students, many=True)
        return Response(serializer.data)

    @grades.mapping.post
    def add_grades(self, request, *args, **kwargs):
        response = {"status": "Gagal"}
        json_data = request.data
        grades = []
        for data in json_data:
            # student = Student.objects.get(pk=data.get('mahasiswa'))
            for grade in data.get('daftar_nilai'):
                grade = {
                    "mahasiswa": data.get('mahasiswa'),
                    "penguji": self.get_object().pk,
                    "so": grade.get('so'),
                    "nilai": grade.get('nilai')
                }
                grades.append(grade)

        serializer = CreateGradeSerializer(data=grades, many=True)
        if serializer.is_valid():
            serializer.save()
            response['status'] = "Sukses"
            response['result'] = json_data
            return Response(response, status=201)
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True)
    def revision(self, request, *args, **kwargs):
        response = dict()
        if self.get_object().is_leader == False:
            return Response({
                "message": "Anda tidak memiliki authoritas untuk menambah revisi judul."
            }, status=403)

        skripsi = self.get_object().ujian.skripsi
        if hasattr(skripsi, 'revision'):
            revisi = skripsi.revision
            response.update({
                "revisi": True,
                "konten": revisi.revisi
            })
            return Response(response, status=status.HTTP_200_OK)
        else:
            response.update({
                "revisi": False,
                "kontent": None
            })
            return Response(response, status=status.HTTP_200_OK)

    @revision.mapping.post    
    def add_revision(self, request, *args, **kwargs):
        response = {"status": "Gagal"}
        json_data = request.data
        if self.get_object().is_leader == False:
            return Response({
                "message": "Anda tidak memiliki authoritas untuk menambah revisi judul."
            }, status=403)

        skripsi = self.get_object().ujian.skripsi
        if json_data.get('revisi') == True:
            revision = TitleRevision.objects.create(skripsi=skripsi)
            revision.revisi = json_data.get('konten')
            revision.save()

            skripsi.title_revision = True
            skripsi.save()

        response['status'] = "Sukses"
        response['result'] = json_data
        return Response(response, status=201)
    
    @revision.mapping.put
    def edit_revision(self, request, *args, **kargs):
        response = {"status": "Gagal"}
        json_data = request.data
        if self.get_object().is_leader == False:
            return Response({
                "message": "Anda tidak memiliki authoritas untuk menambah revisi judul."
            }, status=403)
    
        skripsi = self.get_object().ujian.skripsi
        try:
            revisi = TitleRevision.objects.get(skripsi=skripsi)
        except TitleRevision.DoesNotExist:
            return Response({
                "message": "Belum ada revisi judul untuk skripsi: %s" % skripsi.judul
            }, status=status.HTTP_404_NOT_FOUND)

        if json_data.get('revisi') == False:
            revisi.delete()
            return Response({
                "message": "revisi judul berhasil dihapus."
            }, status=status.HTTP_204_NO_CONTENT)
        else:
            revisi.revisi = json_data.get('revisi')
            revisi.save()
            response['status'] = "Sukses"
            response['result'] = json_data
            return Response(response, status=status.HTTP_200_OK)
        
        
    @action(detail=True)
    def recap(self, request, *args, **kwargs):
        response = dict()
        ujian = self.get_object().ujian
        response.update({'rekap_ujian': RecapExamSerializer(ujian).data})

        students = self.get_object().ujian.skripsi.students.all()
        grades = []
        jumlah_rerata = 0
        rerata_total = 0
        for student in students:
            grade = {
                "mahasiswa": student.nama,
                "nilai": [],
                "jumlah_rerata": jumlah_rerata
            }
            for penguji in ujian.penguji.all():
                list_nilai = penguji.grades.filter(mahasiswa=student)
                nilai = penguji.grades.filter(mahasiswa=student).aggregate(rerata=Avg('nilai'))
                grade['nilai'].append({
                    "penguji": penguji.dosen.nama if penguji.dosen.nama is not None else 'Anonymous',
                    "detail": RecapGradeSerializer(list_nilai, many=True).data,
                    "rerata": "%.2f" % nilai.get('rerata') if nilai.get('rerata') else "%.2f" % 0
                })
                jumlah_rerata += nilai.get('rerata') if nilai.get('rerata') else 0
            grade.update({"jumlah_rerata": "%.2f" % jumlah_rerata})
            grades.append(grade)

            rerata_total = jumlah_rerata / len(ujian.penguji.all())
            grade.update({"rerata_total": "%.2f" % rerata_total})
        response.update({'rekap_nilai': grades})

        list_comment = []
        for penguji in ujian.penguji.all():
            comments = {
                "penguji": penguji.dosen.nama if penguji.dosen.nama else "Anonymus",
                "komentar": []
            }
            for bab in range(0, 7):
                comment = {
                    "bab": bab,
                    "daftar_komentar": []
                }
                for komentar in penguji.comments.filter(bab=bab):
                    comment['daftar_komentar'].append({
                        "halaman": komentar.halaman,
                        "koreksi": komentar.komentar
                    })
                comments['komentar'].append(comment)
            list_comment.append(comments)
        response.update({'rekap_komentar': list_comment})

        if hasattr(ujian.skripsi, 'revision'):
            revisi = ujian.skripsi.revision
            response.update({'revisi_judul': revisi.revisi})

        return Response(response, status=status.HTTP_200_OK)

class SiputProfileViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = ProfileSerializer
    
    def get_queryset(self):
        return self.request.user

    def profile(self, request, *args, **kwargs):
        login_user = self.get_queryset()
        serializer = self.get_serializer(login_user)
        return Response(serializer.data, status=200)

    def edit_profile(self, request, *args, **kwargs):
        login_user = self.get_queryset()
        serializer = self.get_serializer(login_user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Berhasil edit profile",
                "user": serializer.data
            }, status=200)
