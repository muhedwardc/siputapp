from django.db import models
from backend.users.models import User
from backend.essays.models import Essay

class Room(models.Model):
    nama = models.CharField(max_length=50)

    def __str__(self):
        return self.nama

class Session(models.Model):
    nama = models.CharField(max_length=20)
    mulai = models.TimeField()
    selesai = models.TimeField()

    def __str__(self):
        return '{} : {} - {} WIB'.format(self.nama, self.mulai, self.selesai)

class Exam(models.Model):
    STATUS_CHOICES = {
        (1, 'Belum Mulai'),
        (2, 'Sedang Berlangsung'),
        (3, 'Selesai')
    }

    skripsi = models.OneToOneField(Essay, related_name='exams', on_delete=models.DO_NOTHING)
    tanggal = models.DateField()
    sesi = models.ForeignKey(Session, related_name='exams', on_delete=models.DO_NOTHING)
    ruang = models.ForeignKey(Room, related_name='exams', on_delete=models.DO_NOTHING)
    status = models.IntegerField(choices=STATUS_CHOICES, default=1, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.skripsi.judul

    class Meta:
        ordering = ('created_at',)
        db_table = 'exams'
        verbose_name = 'Exam'
        verbose_name_plural = 'Exams'

class Penguji(models.Model):
    dosen = models.ForeignKey(User, related_name='exams', on_delete=models.DO_NOTHING)
    ujian = models.ForeignKey(Exam, related_name='penguji', on_delete=models.CASCADE)
    is_leader = models.BooleanField(default=False)
    is_present = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.dosen.nama

    class Meta:
        ordering = ('created_at',)
        verbose_name = 'Penguji'
        verbose_name_plural = 'Penguji'


