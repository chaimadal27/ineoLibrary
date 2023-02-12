from rest_framework import generics
from rest_framework import permissions
from .serializers import WorkshopSerializer
from rest_framework.response import Response
from .models import Workshop
from rest_framework import status, parsers
from django.shortcuts import get_object_or_404
from django.http import Http404
import datetime

class ListCreateWorkshop(generics.ListCreateAPIView):
    #permission_classes=[permissions.IsAuthenticated]
    serializer_class = WorkshopSerializer
    queryset = Workshop.objects.all()
    #parser_classes = [parsers.FileUploadParser, parsers.FormParser, parsers.MultiPartParser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid():
            #serializer.save(created_by=request.user)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class RetrieveUpdateDestroyWorkshop(generics.RetrieveUpdateDestroyAPIView):
    #permission_classes = [permissions.IsAuthenticated]
    serializer_class = WorkshopSerializer
    #parser_classes = [parsers.FileUploadParser, parsers.FormParser, parsers.MultiPartParser]
    queryset = Workshop.objects.all()

    # def get_queryset(self, pk):
    #     try:
    #         return get_object_or_404(Workshop, pk)
    #     except:
    #         raise Http404('workshop not found')

    # # def perform_destroy(self, instance):
    # #     instance.deleted_at = datetime.datetime.now()
    # #     instance.deleted_by = self.request.user
    # #     instance.save(deleted_at = datetime.datetime.now())
    # #     return Response(status=status.HTTP_204_NO_CONTENT)
    
    def update(self, request, pk):
        workshop = self.get_queryset(pk=pk)
        serializer = WorkshopSerializer(instance=workshop, data=request.data)
        if serializer.is_valid():
            #serializer.save(updated_at = datetime.datetime.now(), updated_by=request.user)
            serializer.save(updated_at = datetime.datetime.now())
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)