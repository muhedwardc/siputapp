from rest_framework import serializers

from .models import Room, Session, Exam, Penguji
from backend.essays.serializers import SimpleEssaySerializer, EssaySerializer, CreateEssaySerializer
from backend.essays.models import Essay, Student
from backend.users.serializers import SimpleUserSerializer

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('nama',)

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ('nama', 'start_time', 'end_time')

class PengujiSerializer(serializers.ModelSerializer):
    dosen = SimpleUserSerializer()

    class Meta:
        model = Penguji
        fields = ('id', 'dosen', 'is_leader', 'is_attending')

class CreatePengujiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Penguji
        fields = ('dosen', 'is_leader')

class SimpleUjianSerializer(serializers.ModelSerializer):
    sesi = SessionSerializer()
    ruang = RoomSerializer()
    skripsi = SimpleEssaySerializer()
    penguji = PengujiSerializer(many=True)

    class Meta:
        model = Exam
        fields = ('tanggal', 'sesi', 'ruang', 'skripsi', 'penguji')

class UjianSerializer(serializers.ModelSerializer):
    sesi = SessionSerializer()
    ruang = RoomSerializer()
    skripsi = EssaySerializer()
    penguji = PengujiSerializer(many=True)

    class Meta:
        model = Exam
        fields = ('tanggal', 'sesi', 'ruang', 'skripsi', 'penguji')

class CreateUjianSerializer(serializers.ModelSerializer):
    skripsi = CreateEssaySerializer()
    penguji = CreatePengujiSerializer(many=True, required=False)

    class Meta:
        model = Exam
        fields = ('tanggal', 'sesi', 'ruang', 'skripsi', 'penguji')

    def create(self, validated_data):
        skripsi_data = validated_data.pop('skripsi')
        penguji_data = validated_data.pop('penguji')
        mahasiswa_data = skripsi_data.pop('mahasiswa')
        new_skripsi = Essay.objects.create(
            judul=skripsi_data['judul'],
            intisari=skripsi_data['intisari'],
            # naskah=skripsi_data['naskah'],
            pembimbing1=skripsi_data['pembimbing1'],
            pembimbing2=skripsi_data['pembimbing2'],
            is_capstone=skripsi_data['is_capstone']
        )

        for data in mahasiswa_data:
            mahasiswa = Student.objects.create(skripsi=new_skripsi, **data)

        new_ujian = Exam.objects.create(
            skripsi=new_skripsi,
            tanggal=validated_data['tanggal'],
            sesi=validated_data['sesi'],
            ruang=validated_data['ruang']
        )
        
        Penguji.objects.create(ujian=new_ujian, dosen=new_skripsi.pembimbing1, is_leader=True)
        Penguji.objects.create(ujian=new_ujian, dosen=new_skripsi.pembimbing2)

        for data in penguji_data:
            Penguji.objects.create(
                ujian=new_ujian,
                dosen=data['dosen']
            )
        
        return new_ujian