from django.http import Http404
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes
)
from django.shortcuts import (
    get_list_or_404,
    get_object_or_404
)
from rest_framework import (
    status,
    permissions,
    authentication
)
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import generics
import datetime

from .models import Session
from .serializers import SessionSerializer

IS_AUTH , TOKEN_AUTH = permissions.IsAuthenticated , authentication.TokenAuthentication

# AUTH_TOKEN is for later use
class ListCreateSession(generics.ListCreateAPIView):
    queryset = Session.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SessionSerializer
    def create(self, request):
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid():
            serializer.save(created_by = request.user, created_at = datetime.datetime.now())
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

    def get_object(self, pk):
        try:
            return Session.objects.get(pk = pk)
        except:
            raise Http404

    def update(self, request:Request, pk:int, *args, **kwargs):
        session = self.get_object(pk = pk)
        serializer = self.get_serializer(instance = session, data=request.data)
        if serializer.is_valid():
            serializer.save(updated_by = request.user, updated_at = datetime.datetime.now())
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_204_NO_CONTENT)

    def destroy(self, request:Request, pk:int, *args, **kwargs):
        session = self.get_object(pk = pk)
        session.deleted_by = request.user
        session.deleted_at = datetime.datetime.now()
        return Response(status=status.HTTP_204_NO_CONTENT)
