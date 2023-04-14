from rest_framework import generics
from rest_framework import permissions
from .serializers import WorkshopAllSerializer, WorkshopImageSerializer, WorkshopLanesSerializer
from rest_framework.response import Response
from .models import Workshop
from rest_framework import status, parsers
from django.shortcuts import get_object_or_404
from django.http import Http404
import datetime


class ListWorkshopAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    serializer_class = WorkshopAllSerializer
    queryset = Workshop.objects.all()


class DetailWorkshopAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    serializer_class = WorkshopAllSerializer
    queryset = Workshop.objects.all()


class CreateWorkshopLanesAPI(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WorkshopLanesSerializer
    queryset = Workshop.objects.all()

    def perform_create(self, serializer):
        return serializer.save(
            created_by=self.request.user,
            created_at=datetime.datetime.now()
        )


class UpdateWorkshopLanes(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WorkshopLanesSerializer
    queryset = Workshop.objects.all()

    def perform_update(self, serializer):
        return serializer.save(
            updated_by=self.request.user,
            updated_at=datetime.datetime.now()
        )


class UpdateWorkshopImage(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    serializer_class = WorkshopImageSerializer
    queryset = Workshop.objects.all()


class DestroyWorkshopAPI(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    serializer_class = WorkshopAllSerializer
    queryset = Workshop.objects.all()
