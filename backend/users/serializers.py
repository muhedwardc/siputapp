from rest_framework import serializers
from .models import User, Role
from django.contrib.auth import authenticate

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'nama',)

class FullUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'nama', 'email', 'nip',
                  'foto')


class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('nama', 'nip')


class RegisterUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


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
