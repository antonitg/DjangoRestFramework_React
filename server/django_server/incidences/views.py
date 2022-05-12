from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status, generics, viewsets
from incidences.serializers import IncidenceSerializer
from incidences.models import Incidence
# Create your views here.
class IncidenceViewSet(viewsets.GenericViewSet):
    serializer_class = IncidenceSerializer;
    permission_classes = [IsAuthenticated,];

    def create(self, request):
        serializer_data = {
            'info': request.data.get('info'),
            'journey':request.data.get('journey')
        }
        serializer = self.serializer_class(data=serializer_data, fields=('info','journey'))
        serializer.is_valid(raise_exception=True)
        serializer.create(serializer.validated_data)
        return Response("Created!", status=status.HTTP_201_CREATED)
    def close(self, request):
        serializer_data = {
            'response': request.data.get('response'),
            'journey':request.data.get('journey')
        }
        serializer = self.serializer_class(data=serializer_data, fields=('response','journey'))
        serializer.is_valid(raise_exception=True)
        serializer.close(serializer.validated_data)
        return Response("Closed!", status=status.HTTP_200_OK)
    def list(self, request):
        queryset = Incidence.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)