from rest_framework import generics
from rest_framework import permissions
from .serializers import UserSerializer
from .models import User


class ListCreateUserAPI(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class RetrieveUpdateDestoryUserAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()