from rest_framework import serializers
from .models import Essay, Student, Subtitle
from users.serializers import SimpleUserSerializer
from users.models import User


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('nama', 'nim', 'prodi', 'konsentrasi', 'tempat_lahir', 'tanggal_lahir', 'telepon')

class SimpleStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('nama', 'nim')

class SimpleEssaySerializer(serializers.ModelSerializer):
    mahasiswa = SimpleStudentSerializer(many=True, source='students')

    class Meta:
        model = Essay
        fields = ('judul', 'mahasiswa', 'is_capstone')

class CreateEssaySerializer(serializers.ModelSerializer):
    mahasiswa = StudentSerializer(many=True, required=False)

    class Meta:
        model = Essay
        fields = ('judul', 'intisari', 'naskah', 'pembimbing1', 'pembimbing2', 'is_capstone', 'mahasiswa')

    def create(self, validated_data):
        mahasiswa_data = validated_data.pop('mahasiswa')
        skripsi = Essay.objects.create(
            judul=validated_data['judul'],
            intisari=validated_data['intisari'],
            # naskah=validated_data['naskah'],
            pembimbing1=validated_data['pembimbing1'],
            pembimbing2=validated_data['pembimbing2'],
            is_capstone=validated_data['is_capstone']
        )

        for data in mahasiswa_data:
            mahasiswa = Student.objects.create(skripsi=skripsi, **data)

        return skripsi
