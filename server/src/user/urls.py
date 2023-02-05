from django.urls import path
from . import views as v

urlpatterns = [
        path('', v.ListCreateUserAPI.as_view()),
        path('<int:pk>/', v.RetrieveUpdateDestoryUserAPI.as_view()),
]
