from django.db import models

from backend.essays.models import Student
from backend.exams.models import Penguji

class StudentOutcome(models.Model):
    judul = models.CharField(max_length=5)
    deksripsi = models.TextField()

    def __str__(self):
        return self.judul

class Grade(models.Model):
    mahasiswa = models.ForeignKey(Student, related_name='grades', on_delete=models.CASCADE)
    penguji = models.ForeignKey(Penguji, related_name='grades', on_delete=models.DO_NOTHING)
    so = models.ForeignKey(StudentOutcome, on_delete=models.DO_NOTHING, blank=True, null=True)
    nilai = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, default=0)

    def __str__(self):
        return self.mahasiswa.nama

    class Meta:
        db_table = 'students_grades'