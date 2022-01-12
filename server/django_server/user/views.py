from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializers
from .models import User
from rest_framework import status
from django.http import Http404
from rest_framework.permissions import IsAuthenticated

class User_APIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None, *args, **kwargs):
        user = User.objects.all()
        serializer = UserSerializers(user, many=True)
        
        return Response(serializer.data)