from django.urls import path
from .views import *
from rest_framework_simplejwt import views as jwt_views


app_name = 'user'
urlpatterns = [
    path('v1/info', Info_APIView.as_view()), 
    path('v1/register/', Register_APIView.as_view(), name='auth_register'),
    path('v1/login/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('v1/login/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    
]