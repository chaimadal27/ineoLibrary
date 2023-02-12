from rest_framework import generics, status, permissions
from .serializers import ActivitySerializer
from .models import Activity

class ListCreateActivityAPI(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ActivitySerializer
    queryset = Activity.objects.all()

class RetrieveUpdateDestroyActivityAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ActivitySerializer
    queryset = Activity.objects.all()