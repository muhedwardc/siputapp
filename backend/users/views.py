from rest_framework import views, viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from knox.models import AuthToken
from django.db.models import Q

from .serializers import FullUserSerializer, RegisterUserSerializer, LoginUserSerializer, PasswordSerializer
from .models import User
from backend.pagination import CustomPagination


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = FullUserSerializer
    queryset = User.objects.all()
    # permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)
    filter_backends = (SearchFilter, OrderingFilter)
    ordering_fields = ('email', 'nama')
    search_fields = ('nama',)
    pagination_class = CustomPagination

    def create(self, request, *args, **kwargs):
        # Menghilangkan metode 'create' diganti dengan register dosen/akademik dibawah.
        pass

    @action(detail=False)
    def dosen(self, request, *args, **kwargs):
        # if 'q' in request.GET:
        #     query = request.GET.get('q')
        #     list_dosen = self.get_queryset().filter(Q(role__pk=2, nama__icontains=query))
        # else:
        #     list_dosen = self.get_queryset().filter(role__pk=2)
        list_dosen = self.get_queryset().filter(is_admin=False)
        serializer = self.get_serializer(list_dosen, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def akademik(self, request, *args, **kwargs):
        list_akademik = self.get_queryset().filter(is_admin=True)
        serializer = self.get_serializer(list_akademik, many=True)
        return Response(serializer.data)

    @dosen.mapping.post
    def register_dosen(self, request, *args, **kwargs):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_admin=False)
            return Response({
                "message": "Pengguna berhasil didaftarkan.",
                "users": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @akademik.mapping.post
    def register_akademik(self, request, *args, **kwargs):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(is_admin=True)
            return Response({
                "message": "Pengguna berhasil didaftarkan.",
                "users": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPI(views.APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        serializer = LoginUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        instance, token = AuthToken.objects.create(user)
        return Response({
            "user": FullUserSerializer(user).data,
            "token": token
        })

class ChangePasswordAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request):
        serializer = PasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.request.user.set_password(serializer.validated_data['password1'])
        self.request.user.save()
        return Response({
            "msg": "User password has been changed."
        })
