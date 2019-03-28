from rest_framework import viewsets, mixins, views
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import SimpleSiputSerializer, SiputSerializer, SiputProfileSerializer
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

class SiputViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
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

    @action(methods=['GET'], detail=False)
    def history(self, request, *args, **kwargs):
        ujian = self.get_queryset().filter(
            ujian__is_finish=True).order_by('-ujian__tanggal')
        serializer = self.get_serializer(ujian, many=True)
        return Response(serializer.data)

class UserProfileAPI(views.APIView):
    def get(self, request, format=None):
        serializer = SiputProfileSerializer(self.request.user)
        return Response(serializer.data)

    def put(self, request, format=None):
        serializer = SiputProfileSerializer(self.request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "msg": "Profile updated.",
                "user": serializer.data
            })
        return Response(serializer.errors)