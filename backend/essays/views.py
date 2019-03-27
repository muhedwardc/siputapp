from rest_framework import viewsets, mixins
from rest_framework.response import Response

from .serializers import CreateEssaySerializer
from .models import Essay

class CreateEssayAPI(viewsets.GenericViewSet, mixins.CreateModelMixin):
    serializer_class = CreateEssaySerializer
    queryset = Essay.objects.all()
