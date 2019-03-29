from rest_framework import serializers

from backend.exams.models import Penguji
from backend.exams.serializers import UjianSerializer, SimpleUjianSerializer
from backend.users.models import User

class SimpleSiputSerializer(serializers.ModelSerializer):
    ujian = SimpleUjianSerializer()

    class Meta:
        model = Penguji
        fields = ('id', 'ujian', 'is_leader', 'is_attending')

class SiputSerializer(serializers.ModelSerializer):
    ujian = UjianSerializer()

    class Meta:
        model = Penguji
        fields = ('id', 'ujian', 'is_leader', 'is_attending')

class SiputProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('nama', 'email', 'nip', 'foto')