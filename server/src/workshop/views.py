from rest_framework import generics
from rest_framework import permissions
from .serializers import WorkshopSerializer
from rest_framework.response import Response
from .models import Workshop
from rest_framework import status, parsers
from django.shortcuts import get_object_or_404
from django.http import Http404
import datetime

class ListCreateWorkshopAPI(generics.ListCreateAPIView):
    #permission_classes=[permissions.IsAuthenticated]
    serializer_class = WorkshopSerializer
    queryset = Workshop.objects.all()
    # parser_classes = [parsers.FileUploadParser, parsers.MultiPartParser, parsers.FormParser]


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        print(request.data)
        if serializer.is_valid():
            #serializer.save(created_by=request.user)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class RetrieveUpdateDestroyWorkshopAPI(generics.RetrieveUpdateDestroyAPIView):
    #permission_classes = [permissions.IsAuthenticated]
    serializer_class = WorkshopSerializer
    # parser_classes = [parsers.FileUploadParser]
    queryset = Workshop.objects.all()




    def perform_update(self, serializer):
        return serializer.save(updated_at=datetime.datetime.now())

    def perform_destroy(self, instance):
        instance.deleted_at = datetime.datetime.now()
        # instance.deleted_by = self.request.user
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class DestoryWorkshopAPI(generics.DestroyAPIView):
    queryset = Workshop.objects.all()


#TODO: share the workshop with other users