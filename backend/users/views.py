from rest_framework import viewsets, permissions, status, generics, mixins, status
from rest_framework.response import Response
from rest_framework.decorators import action
# from knox.models import AuthToken
from django.db.models import Q

from .serializers import FullUserSerializer, RegisterUserSerializer, LoginUserSerializer
from .models import User

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = FullUserSerializer
    queryset = User.objects.all()
    # permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)

    def create(self, request, *args, **kwargs):
        # Menghilangkan metode 'create' diganti dengan register dosen/akademik dibawah.
        pass

    @action(methods=['GET'], detail=False)
    def dosen(self, request, *args, **kwargs):
        if 'q' in request.GET:
            query = request.GET.get('q')
            list_dosen = self.get_queryset().filter(Q(role__pk=2, nama__contains=query))
        else:
            list_dosen = self.get_queryset().filter(role__pk=2)
        serializer = self.get_serializer(list_dosen, many=True)
        return Response(serializer.data)

    @action(methods=['GET'], detail=False)
    def akademik(self, request, *args, **kwargs):
        list_akademik = self.get_queryset().filter(role__pk=1)
        serializer = self.get_serializer(list_akademik, many=True)
        return Response(serializer.data)

    @dosen.mapping.post
    def register_dosen(self, request, *args, **kwargs):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_dosen = User.objects.create_user(
                email=serializer.validated_data['email'],
                role=2,
                password=serializer.validated_data['password']
            )
            new_dosen.save()  # bisa dihapus karena dalam metode 'create_user' sudah di save
            return Response({
                "message": "Pengguna berhasil didaftarkan.",
                "users": self.get_serializer(new_dosen).data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @akademik.mapping.post
    def register_akademik(self, request, *args, **kwargs):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_akademik = User.objects.create_superuser(
                email=serializer.validated_data['email'],
                password=serializer.validated_data['password']
            )
            new_akademik.save()  # bisa dihapus karena dalam metode 'create_superuser' sudah di save
            return Response({
                "message": "Pengguna berhasil didaftarkan.",
                "users": self.get_serializer(new_akademik).data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class LoginAPI(generics.GenericAPIView):
#     permission_classes = (permissions.AllowAny, )

#     def post(self, request):
#         serializer = LoginUserSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data
#         return Response({
#             "user": UserSerializer(user, context=self.get_serializer_context()).data,
#             "token": AuthToken.objects.create(user)
#         })
