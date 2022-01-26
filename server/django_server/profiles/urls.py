from django.urls import path
from .views import *

app_name = 'profiles'
urlpatterns = [
    path('v2/transactions/history/', TransactionsViewSet.as_view({'get': 'history'})),
    path('v2/transactions/', TransactionsViewSet.as_view({'post': 'create'})),
    path('v2/profile/money/', ProfileViewSet.as_view({'get': 'get_money'})),

]