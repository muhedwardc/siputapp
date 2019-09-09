from rest_framework import serializers
from .models import Essay, Student
from backend.users.serializers import SimpleUserSerializer
from backend.users.models import User

class ListStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'nama', 'nim', 'prodi', 'konsentrasi', 'tempat_lahir', 'tanggal_lahir', 'telepon')

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'nama', 'nim', 'prodi', 'konsentrasi', 'tempat_lahir', 'tanggal_lahir', 'telepon')

class CreateStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('nama', 'nim', 'prodi', 'konsentrasi', 'tempat_lahir', 'tanggal_lahir', 'telepon')


class SimpleEssaySerializer(serializers.ModelSerializer):
    pembimbing_satu = serializers.SerializerMethodField()
    pembimbing_dua = serializers.SerializerMethodField()
    mahasiswa = ListStudentSerializer(many=True, source='students')

    def get_pembimbing_satu(self, essay):
        pembimbing_satu = dict()
        pembimbing_satu.update({'id': essay.pembimbing_satu.pk, 'nama': essay.pembimbing_satu.nama})
        return pembimbing_satu

    def get_pembimbing_dua(self, essay):
        pembimbing_dua = dict()
        pembimbing_dua.update({'id': essay.pembimbing_dua.pk, 'nama': essay.pembimbing_dua.nama})
        return pembimbing_dua

    class Meta:
        model = Essay
        fields = ('judul', 'mahasiswa', 'pembimbing_satu', 'pembimbing_dua', 'is_capstone')

class EssaySerializer(serializers.ModelSerializer):
    # pembimbing_satu = serializers.StringRelatedField()
    # pembimbing_dua = serializers.StringRelatedField()
    mahasiswa = ListStudentSerializer(many=True, source='students')

    class Meta:
        model = Essay
        fields = ('judul', 'intisari', 'naskah', 'pembimbing_satu', 'pembimbing_dua', 'is_capstone', 'mahasiswa')
 
class CreateEssaySerializer(serializers.ModelSerializer):
    mahasiswa = CreateStudentSerializer(many=True)

    def update(self, instance, validated_data):
        instance.judul = validated_data.get('judul', instance.judul)
        instance.intisari = validated_data.get('intisari', instance.intisari)
        instance.is_capstone = validated_data.get('is_capstone', instance.is_capstone)
        instance.naskah = validated_data.get('naskah', instance.naskah)
        instance.save()

        if validated_data.get('mahasiswa'):
            for mahasiswa, student in zip(validated_data.pop('mahasiswa'), instance.students.all()):
                student.__dict__.update(mahasiswa)
                student.save()

        return instance

    class Meta:
        model = Essay
        fields = ('judul', 'intisari', 'naskah', 'pembimbing_satu', 'pembimbing_dua', 'is_capstone', 'mahasiswa')