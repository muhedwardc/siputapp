from rest_framework import serializers
from .models import Essay, Student, Subtitle, Comment, Grade
from backend.users.serializers import SimpleUserSerializer
from backend.users.models import User


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

class EssaySerializer(serializers.ModelSerializer):
    pembimbing1 = SimpleUserSerializer()
    pembimbing2 = SimpleUserSerializer()
    mahasiswa = StudentSerializer(many=True, source='students')

    class Meta:
        model = Essay
        fields = ('judul', 'intisari', 'naskah', 'pembimbing1', 'pembimbing2', 'is_capstone', 'mahasiswa')

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

class CommentSerializer(serializers.ModelSerializer):
    dosen = SimpleUserSerializer()
    
    class Meta:
        model = Comment
        fields = ('dosen', 'bab', 'halaman', 'komentar')

class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('skripsi', 'dosen', 'bab', 'halaman', 'komentar')

class GradeSerializer(serializers.ModelSerializer):
    dosen = SimpleUserSerializer()

    class Meta:
        model = Grade
        fields = ('dosen', 'so1', 'so2', 'so3', 'so4', 'so5', 'so6')

class CreateGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('mahasiswa', 'dosen', 'so1', 'so2', 'so3', 'so4', 'so5', 'so6')
