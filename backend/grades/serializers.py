from rest_framework import serializers

from .models import Grade
from backend.essays.serializers import StudentSerializer


class GradeSerializer(serializers.ModelSerializer):
    mahasiswa = StudentSerializer()

    class Meta:
        model = Grade
        fields = ('mahasiswa', 'so1', 'so2', 'so3', 'so4', 'so5', 'so6')

class CreateGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('mahasiswa', 'so1', 'so2', 'so3', 'so4', 'so5', 'so6')

    def save(self, penguji):
        new_grade = Grade.objects.create(
                penguji=penguji,
                mahasiswa=self.validated_data['mahasiswa'],
                so1 = self.validated_data['so1'],
                so2 = self.validated_data['so2'],
                so3 = self.validated_data['so3'],
                so4 = self.validated_data['so4'],
                so5 = self.validated_data['so5'],
                so6 = self.validated_data['so6']
            )
        return new_grade
