from rest_framework import serializers

from .models import Room, Session, Exam, Penguji
from essays.serializers import SimpleEssaySerializer
from users.serializers import SimpleUserSerializer

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

class UjianSerializer(serializers.ModelSerializer):
    sesi = SessionSerializer()
    ruang = RoomSerializer()
    skripsi = SimpleEssaySerializer()
    penguji = PengujiSerializer(many=True)

    class Meta:
        model = Exam
        fields = ('tanggal', 'sesi', 'ruang', 'skripsi', 'penguji')