from django.urls import path
from .views import *
from rest_framework_simplejwt import views as jwt_views


app_name = 'user'
urlpatterns = [
    path('v1/user', User_APIView.as_view()), 
    # path('v1/post/<int:pk>/', User_APIView_Detail.as_view()),
    path('v1/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('v1/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    
]