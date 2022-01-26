from datetime import datetime , timezone
from logging import raiseExceptions
from .models import Journey, Station, Bike
from rest_framework import status, generics, viewsets
from django.http.response import HttpResponse
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import BikeSerializer, JourneySerializer, StationSerializer, HistoryJourneySerializer
from rest_framework.response import Response

# Create your views here.
class GetBikes_APIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Bike.objects.all()
    serializer_class = BikeSerializer

class GetStations_APIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Station.objects.all()
    serializer_class = StationSerializer
class JourneyViewSet(viewsets.GenericViewSet):  # <- Definir els mixins 
    # Declarar variables propies de la clase
    serializer_class = JourneySerializer;
    permission_classes = [IsAuthenticated,]
    # https://www.django-rest-framework.org/api-guide/viewsets/ definir-los en views i urls
    def actual(self, request):
        queryset = Journey.objects.filter(stopStation = None, user = request.user)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    def history(self, request):
        queryset = Journey.objects.filter(user = request.user)
        serializer = HistoryJourneySerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


    def create(self, request):
        serializer_data = {
            'user': request.user.id,
            'startStation': request.data.get('startStation'),
            'start': datetime.now(timezone.utc)
        }
        serializer = self.serializer_class(data=serializer_data)
        serializer.is_valid(raise_exception=True)
        serializer.create(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    def stop(self, request):
        serializer_data = {
            'user': request.user.id,
            'stopStation': request.data.get('stopStation'),
        }
        serializer = self.serializer_class(data=serializer_data)
        serializer.is_valid(raise_exception=True)
        serializer.stop(serializer.validated_data)
        return Response({'status':'success', 'data':serializer.data}, status=status.HTTP_202_ACCEPTED)





