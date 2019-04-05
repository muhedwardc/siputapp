from django.db import models

from backend.essays.models import Student
from backend.exams.models import Penguji

class Grade(models.Model):
    mahasiswa = models.ForeignKey(Student, related_name='grades', on_delete=models.CASCADE)
    penguji = models.ForeignKey(Penguji, related_name='grades', on_delete=models.DO_NOTHING)
    so1 = models.IntegerField()
    so2 = models.IntegerField()
    so3 = models.IntegerField()
    so4 = models.IntegerField()
    so5 = models.IntegerField()
    so6 = models.IntegerField()

    def __str__(self):
        return self.mahasiswa.nama

    class Meta:
        db_table = 'students_grades'