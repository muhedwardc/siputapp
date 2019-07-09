from django.db import models
from backend.essays.models import Essay
from backend.exams.models import Penguji

class Comment(models.Model):
    BAB_CHOICES = {
        (0, 'Abstrak'),
        (1, 'Pendahuluan'),
        (2, 'Dasar Teori'),
        (3, 'Metode Penelitian'),
        (4, 'Hasil dan Pembahasan'),
        (5, 'Kesimpulan'),
        (6, 'Umum')
    }

    skripsi = models.ForeignKey(Essay, related_name='comments', on_delete=models.CASCADE)
    penguji = models.ForeignKey(Penguji, related_name='comments', on_delete=models.CASCADE)
    bab = models.IntegerField(choices=BAB_CHOICES)
    halaman = models.IntegerField(null=True, blank=True)
    komentar = models.TextField()

    def __str__(self):
        return self.skripsi.judul

    class Meta:
        db_table = 'essays_comments'