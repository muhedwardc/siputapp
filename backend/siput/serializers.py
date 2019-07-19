from rest_framework import serializers

from backend.exams.models import Penguji, Exam
from backend.exams.serializers import ExamSerializer, PengujiSerializer
from backend.essays.serializers import SimpleEssaySerializer, EssaySerializer
from backend.users.models import User

class SimpleSiputExamSerializer(serializers.ModelSerializer):
    sesi = serializers.StringRelatedField()
    ruang = serializers.StringRelatedField()
    skripsi = SimpleEssaySerializer()
    penguji = PengujiSerializer(many=True, required=False)
    ketua = serializers.SerializerMethodField()

    def get_ketua(self, exam):
        for penguji in exam.penguji.all():
            if penguji.is_leader == True:
                dosen = penguji.dosen
                return dosen.pk
            else:
                return None

    class Meta:
        model = Exam
        fields = ('status', 'tanggal', 'sesi', 'ruang', 'skripsi', 'ketua', 'penguji')


class SiputExamSerializer(serializers.ModelSerializer):
    sesi = serializers.StringRelatedField()
    ruang = serializers.StringRelatedField()
    skripsi = EssaySerializer()
    penguji = PengujiSerializer(many=True, required=False)
    ketua = serializers.SerializerMethodField()

    def get_ketua(self, exam):
        for penguji in exam.penguji.all():
            if penguji.is_leader == True:
                dosen = penguji.dosen
                return dosen.pk
            else:
                return None

    class Meta:
        model = Exam
        fields = ('status', 'tanggal', 'sesi', 'ruang', 'skripsi', 'ketua', 'penguji')


class ListSiputPengujiSerializer(serializers.ModelSerializer):
    ujian = SimpleSiputExamSerializer()

    class Meta:
        model = Penguji
        fields = ('id', 'ujian')


class SiputPengujiSerializer(serializers.ModelSerializer):
    ujian = SiputExamSerializer()

    class Meta:
        model = Penguji
        fields = ('ujian', )