import jwt
import traceback
import datetime

from knox.models import AuthToken

from rest_framework import views, viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action

from backend.users.serializers import FullUserSerializer, RegisterUserSerializer, LoginUserSerializer, PasswordSerializer, PengelolaSerializer
from backend.users.models import User, Pengelola
from backend.pagination import CustomPagination


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = FullUserSerializer
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser)
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.GET.get('search')
        ordering = self.request.GET.get('ordering')

        # filter search dan order
        if search:
            queryset = queryset.filter(nama__icontains=search)
        if ordering:
            queryset = queryset.order_by(ordering)

        return queryset

    def create(self, request, *args, **kwargs):
        # Menghilangkan metode 'create' diganti dengan register dosen/akademik dibawah.
        pass

    @action(detail=False)
    def dosen(self, request, *args, **kwargs):
        list_dosen = self.get_queryset().filter(is_admin=False)

        date = self.request.GET.get('date')
        session = self.request.GET.get('session')

        # filter dosen yang tidak menguji hari tertentu
        if date and session:
            list_available_dosen = list()
            for obj in list_dosen:
                exams_today = obj.exams.filter(ujian__tanggal=date, ujian__sesi=session)
                if not exams_today.exists():
                    list_available_dosen.append(obj)

            list_dosen = list_available_dosen

        pagination = request.GET.get('page')
        if pagination == 'all':
            serializer = self.get_serializer(list_dosen, many=True)
            return Response(serializer.data)
        else:
            page = self.paginate_queryset(list_dosen)
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

    @action(detail=False)
    def akademik(self, request, *args, **kwargs):
        list_akademik = self.get_queryset().filter(is_admin=True)
        
        pagination = request.GET.get('page')
        if pagination == 'all':
            serializer = self.get_serializer(list_akademik, many=True)
            return Response(serializer.data)
        else:
            page = self.paginate_queryset(list_akademik)
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

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

class PengelolaViewSet(viewsets.ModelViewSet):
    serializer_class = PengelolaSerializer
    queryset = Pengelola.objects.all()

    def create(self, request, *args, **kwargs):
        jabatan = request.data.get('jabatan')
        daftar_jabatan = [
            'Kepala Departemen',
            'Sekretaris'
        ]

        if jabatan not in daftar_jabatan:
            return Response({
                "message": "Jabatan salah."
            }, status=400)

        pengelola = Pengelola.objects.filter(jabatan=jabatan).first()
        if pengelola:
            serializer = self.get_serializer(pengelola, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            return Response(serializer.errors, status=400)
        else:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)

class LoginAPI(views.APIView):
    serializer_class = FullUserSerializer
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        serializer = LoginUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        instance, token = AuthToken.objects.create(user)
        return Response({
            "user": self.serializer_class(user).data,
            "token": token
        })

class LoginGoogle(views.APIView):
    serializer_class = FullUserSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        user_token = request.data['token']
        try:
            user_data = jwt.decode(user_token, algorithms='RS256', verify=False)
        except Exception:
            traceback.print_exc()
            return Response({
                "message": "Invalid token."
            }, status=status.HTTP_400_BAD_REQUEST)
        
        email = user_data.get('email')
        foto = user_data.get('picture')
        if email:
            try:
                user = User.objects.get(email=email)
                instance, token = AuthToken.objects.create(user)

                # save picture from google to user
                if foto:
                    user.foto = foto
                    user.save()
                
                user.last_login = datetime.datetime.today()
                user.save()
                
                return Response({
                    "user": self.serializer_class(user).data,
                    "token": token
                }, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({
                    "message": "Pengguna dengan email %s tidak terdaftar. Silahkan menghubungi bagian Akademik." % email
                }, status=status.HTTP_404_NOT_FOUND)

class ChangePasswordAPI(views.APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request):
        serializer = PasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.request.user.set_password(serializer.validated_data['password1'])
        self.request.user.save()
        return Response({
            "message": "Password pengguna berhasil diperbaharui."
        })