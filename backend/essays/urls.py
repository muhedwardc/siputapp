from django.urls import path
from .views import CreateEssayAPI

app_name = 'essays'

urlpatterns = [
    path('', CreateEssayAPI.as_view({'post':'create'})),
]