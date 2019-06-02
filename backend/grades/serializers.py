from rest_framework import serializers

from .models import Grade
from backend.essays.serializers import StudentSerializer


class GradeSerializer(serializers.ModelSerializer):
    mahasiswa = StudentSerializer()

    class Meta:
        model = Grade
        fields = ('mahasiswa', 'penguji', 'so', 'nilai')

class CreateGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('mahasiswa', 'penguji', 'so', 'nilai')

    def save(self, penguji):
        pass
