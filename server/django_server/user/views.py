from django.http.response import HttpResponse
from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegisterSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework import status, generics
from django.http import Http404
from django.core import serializers as core_serializers
from rest_framework.permissions import IsAuthenticated, AllowAny

class Register_APIView(generics.CreateAPIView):
    # def post(self request)
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class Info_APIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None, *args, **kwargs):
        # user = User.objects.all()
        # serializer_class = RegisterSerializers
        # data = core_serializers.serialize('json', request)
        return HttpResponse(request.user.id, content_type="application/json")
