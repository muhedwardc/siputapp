from rest_framework import serializers

from .models import Comment
from backend.exams.serializers import PengujiSerializer

class CommentSerializer(serializers.ModelSerializer):
    # penguji = serializers.StringRelatedField()
    
    class Meta:
        model = Comment
        fields = ('id', 'bab', 'halaman', 'komentar')

class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('bab', 'halaman', 'komentar')

    def save(self, skripsi, penguji):
        new_comment = Comment.objects.create(
            skripsi=skripsi,
            penguji=penguji,
            bab=self.validated_data['bab'],
            halaman=self.validated_data['halaman'],
            komentar=self.validated_data['komentar']
        )
        return new_comment
