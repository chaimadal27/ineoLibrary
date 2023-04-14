from django.urls import path
from . import views as v

urlpatterns = [
    path('', v.ListCreateActivityAPI.as_view()),
    path('<str:pk>/', v.RetrieveUpdateDestroyActivityAPI.as_view()),
]