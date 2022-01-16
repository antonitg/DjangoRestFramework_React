from unicodedata import name
from django.urls import path
from .views import *

app_name = 'stations'
urlpatterns = [
    path('v1/stations/', GetStations_APIView.as_view(), name='getStations'), 
    path('v1/bikes/', GetBikes_APIView.as_view(), name='getBikes'),
    # path('v1/login/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('v1/login/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    
]