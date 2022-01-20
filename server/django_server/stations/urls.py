from unicodedata import name
from django.urls import path
from .views import *

app_name = 'stations'
urlpatterns = [
    path('v2/stations/', GetStations_APIView.as_view(), name='getStations'), 
    path('v2/bikes/', GetBikes_APIView.as_view(), name='getBikes'),
    path('v2/journey/', JourneyViewSet.as_view({'post': 'create'})),
    path('v2/journey/stop/', JourneyViewSet.as_view({'post': 'stop'})),

    # path('v1/login/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('v1/login/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    
]