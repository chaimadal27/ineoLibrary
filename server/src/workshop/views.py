from rest_framework import generics
from rest_framework import permissions
from .serializers import WorkshopSerializer
from rest_framework.response import Response
from .models import Workshop
from rest_framework import status

import datetime

class ListCreateWorkshop(generics.ListCreateAPIView):
   
    serializer_class = WorkshopSerializer
    queryset = Workshop.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid():
            serializer.save(created_by = request.user, created_at = datetime.datetime.now())
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class RetrieveUpdateDestroyWorkshop(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WorkshopSerializer
    queryset = Workshop.objects.all()