from rest_framework import serializers

from .models import Grade
from backend.essays.models import Student

class ListGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('so', 'nilai')


class GradeSerializer(serializers.ModelSerializer):
    mahasiswa = serializers.CharField(source='nama')
    nilai = ListGradeSerializer(source='grades', many=True)

    class Meta:
        model = Student
        fields = ('mahasiswa', 'nilai')

class CreateGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('mahasiswa', 'penguji', 'so', 'nilai')

    def create(self, validated_data):
        for data in validated_data:
            print(data)

        return super().create(validated_data)

class RecapGradeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Grade
        fields = ('so', 'nilai')