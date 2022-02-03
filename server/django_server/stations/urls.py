from unicodedata import name
from django.urls import path
from .views import *

app_name = 'stations'
urlpatterns = [
    path('v2/stations/', GetStations_APIView.as_view(), name='getStations'), 
    path('v2/bikes/', GetBikes_APIView.as_view(), name='getBikes'),
    path('v2/journey/actual/', JourneyViewSet.as_view({'get': 'actual'})),
    path('v2/journey/history/', JourneyViewSet.as_view({'get': 'history'})),
    path('v2/journey/', JourneyViewSet.as_view({'post': 'create'})),
    path('v2/journey/stop/', JourneyViewSet.as_view({'post': 'stop'})),
    path('v3/stations/', StationsAdminViewSet.as_view({'post':'create'})),
    path('v3/stations/update/', StationsAdminViewSet.as_view({'post':'update'})),
    path('v3/bikes/', BikeAdminViewSet.as_view({'post':'create'})),
    path('v3/bikes/update/', BikeAdminViewSet.as_view({'post':'update'}))

]