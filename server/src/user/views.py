from rest_framework import generics
from rest_framework import permissions, parsers
from .serializers import UserSerializer
from .models import User


class ListCreateUserAPI(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    parser_classes = [parsers.FileUploadParser, parsers.FormParser, parsers.MultiPartParser]
    permission_classes = [permissions.IsAuthenticated]



class RetrieveUpdateDestoryUserAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    parser_classes = [parsers.FileUploadParser, parsers.FormParser, parsers.MultiPartParser]
    permission_classes = [permissions.IsAuthenticated]