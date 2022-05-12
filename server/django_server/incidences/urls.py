from unicodedata import name
from django.urls import path
from .views import *

app_name = 'incidences'
urlpatterns = [
    path('v4/incidence/', IncidenceViewSet.as_view({'post':'create'})),
    path('v4/incidence/list/', IncidenceViewSet.as_view({'get': 'list'})),
    path('v4/incidence/close/', IncidenceViewSet.as_view({'post': 'close'})),

]