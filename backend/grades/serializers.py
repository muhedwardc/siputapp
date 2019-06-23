from rest_framework import serializers

from .models import Grade
from backend.essays.models import Student

class ListGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('so', 'nilai')


class GradeSerializer(serializers.ModelSerializer):
    nilai = ListGradeSerializer(source='grades', many=True)

    class Meta:
        model = Student
        fields = ('mahasiswa', 'nilai')

class CreateGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('mahasiswa', 'penguji', 'so', 'nilai')

    def create(self, validated_data):
        # cek apakah nilai sudah ada. jika ya maka update nilai, jika belum maka buat nilai baru
        try:
            grade = Grade.objects.get(mahasiswa=validated_data.get('mahasiswa'), penguji=validated_data.get('penguji'), so=validated_data.get('so'))
            grade.__dict__.update(**validated_data)
            grade.save()
        except Grade.DoesNotExist:
            grade = Grade.objects.create(**validated_data)

        return grade

class RecapGradeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Grade
        fields = ('so', 'nilai')