from dataclasses import fields
from .models import Station, Bike
from rest_framework import serializers
from django.core import serializers as core_serializers

# from rest_framework.validators import UniqueValidator

class BikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        fields = "__all__"

class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = '__all__'
    def to_representation(self, instance):
        return {
                'id' : instance.id,
                'name' : instance.name, 
                'status' : instance.status, 
                'photo' : instance.photo, 
                'location' : instance.location,
                'space' : instance.space,
                'bikes' : list(Bike.objects.filter(station_id_id = instance.id).values()),
        
        }
