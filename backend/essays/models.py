from django.db import models
from backend.users.models import User

class Essay(models.Model):
    judul = models.CharField(max_length=250)
    intisari = models.TextField()
    naskah = models.FileField(upload_to='skripsi', blank=True)
    pembimbing_satu = models.ForeignKey(User, related_name='pembimbing_satu', on_delete=models.DO_NOTHING)
    pembimbing_dua = models.ForeignKey(User, related_name='pembimbing_dua', on_delete=models.DO_NOTHING)
    is_capstone = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.judul

    class Meta:
        ordering = ('created_at', )
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

