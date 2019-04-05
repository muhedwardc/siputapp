from django.db import models
from backend.essays.models import Essay
from backend.exams.models import Penguji

class Comment(models.Model):
    skripsi = models.ForeignKey(Essay, related_name='comments', on_delete=models.CASCADE)
    penguji = models.ForeignKey(Penguji, related_name='comments', on_delete=models.DO_NOTHING)
    bab = models.CharField(max_length=30)
    halaman = models.IntegerField()
    komentar = models.TextField()

    def __str__(self):
        return self.skripsi.judul

    class Meta:
        db_table = 'essays_comments'