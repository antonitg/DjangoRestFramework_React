from django.shortcuts import render
from .models import Station, Bike
from rest_framework import status, generics
from django.http.response import HttpResponse
from rest_framework.permissions import IsAuthenticated
from .serializers import BikeSerializer, StationSerializer
# Create your views here.
class GetBikes_APIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Bike.objects.all()
    serializer_class = BikeSerializer
    # queryset.get

class GetStations_APIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Station.objects.all()
    serializer_class = StationSerializer
    # queryset.
    # for index, bi in queryset.iterator():
    #     bi.bikes = queryset[index].bike 
    # queryset.bike
    # 
    # HttpResponse(serializer_class, content_type="application/json")
    