from django.shortcuts import render
from rest_framework import viewsets

from .serializers import UjianSerializer
from .models import Exam, Penguji

class ExamViewSet(viewsets.ModelViewSet):
    serializer_class = UjianSerializer
    queryset = Exam.objects.all()