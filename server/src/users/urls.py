from django.urls import path
from . import views

urlpatterns = [
        path('', views.ListCreateUserAPI.as_view()),
        path('<int:pk>/', views.RetrieveUpdateDestroyUserAPI.as_view()),
]
