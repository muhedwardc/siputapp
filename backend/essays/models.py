from django.db import models
from backend.users.models import User

class Essay(models.Model):
    judul = models.CharField(max_length=250)
    intisari = models.TextField()
    naskah = models.FileField(upload_to='skripsi', blank=True)
    pembimbing1 = models.ForeignKey(User, related_name='pembimbing1', on_delete=models.DO_NOTHING)
    pembimbing2 = models.ForeignKey(User, related_name='pembimbing2', on_delete=models.DO_NOTHING)
    is_capstone = models.BooleanField()

    def __str__(self):
        return self.judul

    class Meta:
        db_table = 'essays'
        verbose_name = 'Essay'
        verbose_name_plural = 'Essays'

class Student(models.Model):
    nama = models.CharField(max_length=250)
    nim = models.CharField(max_length=30, verbose_name='Nomor Induk Mahasiswa')
    prodi = models.CharField(max_length=20, verbose_name='Program Studi')
    konsentrasi = models.CharField(max_length=50)
    tempat_lahir = models.CharField(max_length=50, verbose_name='Tempat Lahir')
    tanggal_lahir = models.DateField(verbose_name='Tanggal Lahir')
    telepon = models.CharField(max_length=20)

    skripsi = models.ForeignKey(Essay, related_name='students', on_delete=models.DO_NOTHING, null=True)

    def __str__(self):
        return self.nama

    class Meta:
        db_table = 'students'
        verbose_name = 'Student'
        verbose_name_plural = 'Students'

class Subtitle(models.Model):
    skripsi = models.ForeignKey(Essay, related_name='subtitles', on_delete=models.CASCADE)
    mahasiswa = models.ForeignKey(Student, related_name='subtitles', on_delete=models.DO_NOTHING)
    nama = models.CharField(max_length=250)

    def __str__(self):
        return self.nama

# class Comment(models.Model):
#     skripsi = models.ForeignKey(Essay, related_name='comments', on_delete=models.CASCADE)
#     penguji = models.ForeignKey('exams.Penguji', related_name='comments', on_delete=models.DO_NOTHING)
#     bab = models.CharField(max_length=30)
#     halaman = models.IntegerField()
#     komentar = models.TextField()

#     def __str__(self):
#         return self.skripsi.judul

# class Grade(models.Model):
#     mahasiswa = models.ForeignKey(Student, related_name='grades', on_delete=models.CASCADE)
#     penguji = models.ForeignKey('exams.Penguji', related_name='grades', on_delete=models.DO_NOTHING)
#     so1 = models.IntegerField()
#     so2 = models.IntegerField()
#     so3 = models.IntegerField()
#     so4 = models.IntegerField()
#     so5 = models.IntegerField()
#     so6 = models.IntegerField()

#     def __str__(self):
#         return self.mahasiswa.nama

