from django.shortcuts import render
from rest_framework import viewsets

from .serializers import UjianSerializer, CreateUjianSerializer, SimpleUjianSerializer
from .models import Exam, Penguji

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()

    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'create':
            return CreateUjianSerializer
        elif self.action == 'retrieve':
            return UjianSerializer
        return SimpleUjianSerializer