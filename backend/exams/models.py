from django.db import models
from users.models import User
from essays.models import Essay

class Room(models.Model):
    nama = models.CharField(max_length=20)

    def __str__(self):
        return self.nama

class Session(models.Model):
    nama = models.CharField(max_length=20)
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return '{} : {} - {} WIB'.format(self.nama, self.start_time, self.end_time)

class Exam(models.Model):
    skripsi = models.OneToOneField(Essay, related_name='essay', on_delete=models.DO_NOTHING)
    tanggal = models.DateField()
    sesi = models.ForeignKey(Session, related_name='exams', on_delete=models.DO_NOTHING)
    ruang = models.ForeignKey(Room, related_name='exams', on_delete=models.DO_NOTHING)
    is_finish = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.skripsi.judul

    class Meta:
        db_table = 'exams'
        verbose_name = 'Exam'
        verbose_name_plural = 'Exams'

class Penguji(models.Model):
    dosen = models.ForeignKey(User, related_name='exams', on_delete=models.DO_NOTHING)
    ujian = models.ForeignKey(Exam, related_name='penguji', on_delete=models.CASCADE)
    is_leader = models.BooleanField(default=False)
    is_attending = models.BooleanField(null=True)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{} : {}'.format(self.pengguna.nama, self.ujian.tanggal)

    class Meta:
        verbose_name = 'Penguji'
        verbose_name_plural = 'Penguji'


