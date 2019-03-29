from rest_framework import viewsets, mixins, views, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import SimpleSiputSerializer, SiputSerializer, SiputProfileSerializer
from backend.essays.serializers import EssaySerializer, CommentSerializer, CreateCommentSerializer
from backend.exams.models import Penguji, Exam

# class SiputAPI(views.APIView):
#     def get(self, request, format=None):
#         unconfirmed_ujian = request.user.exams.filter(ujian__is_finish=False, is_attending=None).order_by('created_date')
#         next_ujian = request.user.exams.filter(ujian__is_finish=False, is_attending=True).first()
#         if next_ujian:
#             return Response({
#                 "next_ujian": SimpleSiputSerializer(next_ujian).data,
#                 "unconfirmed_ujian": SimpleSiputSerializer(unconfirmed_ujian, many=True).data
#             })
#         return Response({
#             "next_ujian": "Tidak ada ujian yang akan datang.",
#             "unconfirmed_ujian": SimpleSiputSerializer(unconfirmed_ujian, many=True).data
#         })

class ExamViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    def get_queryset(self):
        return self.request.user.exams.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return SiputSerializer
        return SimpleSiputSerializer

    def list(self, request):
        ujian = self.get_queryset().filter(ujian__is_finish=False).order_by('ujian__tanggal')
        serializer = self.get_serializer(ujian, many=True)
        return Response(serializer.data)
    
    @action(methods=['POST'], detail=True)
    def terima(self, request, *args, **kwargs):
        penguji = self.get_object()
        penguji.is_attending = True
        penguji.save()
        return Response({
            "msg": "Status kehadiran berhasil diubah."
        })

    @action(methods=['POST'], detail=True)
    def tolak(self, request, *args, **kwargs):
        penguji = self.get_object()
        penguji.is_attending = False
        penguji.save()
        return Response({
            "msg": "Status kehadiran berhasil diubah."
        })

    @action(detail=False)
    def history(self, request, *args, **kwargs):
        ujian = self.get_queryset().filter(
            ujian__is_finish=True).order_by('-ujian__tanggal')
        serializer = self.get_serializer(ujian, many=True)
        return Response(serializer.data)

    @action(detail=True)
    def essays(self, request, *args, **kwargs):
        skripsi = self.get_object().ujian.skripsi
        serializer = EssaySerializer(skripsi)
        return Response(serializer.data)

    @action(detail=True)
    def comments(self, request, *args, **kwargs):
        skripsi = self.get_object().ujian.skripsi
        comments = skripsi.comments.filter(dosen=request.user)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    @comments.mapping.post
    def add_comment(self, request, *args, **kwargs):
        skripsi = self.get_object().ujian.skripsi
        serializer = CreateCommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(skripsi=skripsi, dosen=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserProfileAPI(views.APIView):
    def get(self, request, format=None):
        serializer = SiputProfileSerializer(request.user)
        return Response(serializer.data)

    def put(self, request, format=None):
        serializer = SiputProfileSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "msg": "Profile updated.",
                "user": serializer.data
            })
        return Response(serializer.errors)