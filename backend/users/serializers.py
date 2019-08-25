import datetime

from rest_framework import serializers
from .models import User, Pengelola
from django.contrib.auth import authenticate


class FullUserSerializer(serializers.ModelSerializer):
    prodi = serializers.CharField(required=False)
    konsentrasi = serializers.CharField(required=False)
    exams_this_month = serializers.SerializerMethodField()

    def get_exams_this_month(self, user):
        today = datetime.date.today()
        next_month = (today.replace(day=28) + datetime.timedelta(days=4)) 

        first_day = today.replace(day=1)
        last_day = next_month - datetime.timedelta(days=next_month.day)

        exams = user.exams.filter(ujian__tanggal__gte=first_day, ujian__tanggal__lte=last_day)
        exams_this_month = exams.count()
        return exams_this_month

    class Meta:
        model = User
        exclude = ('password', 'last_login')
        read_only_fields = ('is_admin', 'foto')


class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('nama', 'nip')


class RegisterUserSerializer(serializers.Serializer):
    nama = serializers.CharField()
    email = serializers.EmailField()
    prodi = serializers.CharField(required=False, allow_null=True)
    konsentrasi = serializers.CharField(required=False, allow_null=True)
    nip = serializers.CharField()

    def create(self, validated_data):
        if validated_data['is_admin']:
            user = User.objects.create_superuser(
                nama=validated_data['nama'],
                email=validated_data['email'],
                nip=validated_data['nip'],
            )
            # user.prodi = validated_data['prodi']
            # user.konsentrasi = validated_data['konsentrasi']
            # user.save()
        else:
            user = User.objects.create_user(
                nama=validated_data['nama'],
                email=validated_data['email'],
                nip=validated_data['nip'],
            )
            user.prodi = validated_data['prodi']
            user.konsentrasi = validated_data['konsentrasi']
            user.save()
        return user

class LoginUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)

        if user:
            return user
        raise serializers.ValidationError('Informasi akun salah.')


class PasswordSerializer(serializers.Serializer):
    password1 = serializers.CharField()
    password2 = serializers.CharField()

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("Password doesn't match!")
        return data

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('nama', 'prodi', 'konsentrasi', 'nip', 'foto')

class PengelolaSerializer(serializers.ModelSerializer):
    nama = serializers.CharField(source='user.nama', required=False)
    nip = serializers.CharField(source='user.nip', required=False)

    class Meta:
        model = Pengelola
        exclude = ('id',)