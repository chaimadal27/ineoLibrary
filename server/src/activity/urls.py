from django.urls import path
from . import views as v

urlpatterns = [
    path('', v.ListCreateActivityAPI.as_view()),
    path('<int:pk>/', v.RetrieveUpdateDestroyActivityAPI.as_view()),
]