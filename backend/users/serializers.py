from rest_framework import serializers
from .models import User, Role
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'nama',)

class FullUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'nama', 'email', 'prodi', 'konsentrasi', 'nip',
                  'foto', 'role')


class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('nama', 'nip')


class RegisterUserSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField()
    # password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('nama', 'email', 'prodi', 'konsentrasi', 'nip')

    def create(self, validated_data):
        role = get_object_or_404(Role, pk=validated_data['role'])

        new_user = User.objects.create(
            nama=validated_data['nama'],
            email=validated_data['email'],
            prodi=validated_data['prodi'],
            konsentrasi=validated_data['konsentrasi'],
            nip=validated_data['nip'],
            role=role
        )
        new_user.save()

        return new_user

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
