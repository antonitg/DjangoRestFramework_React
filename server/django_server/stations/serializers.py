from datetime import date, datetime , timezone
from .models import Journey, Station, Bike
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
    def to_internal_representation(self, instance):
        return {
                'id' : instance.id,
                'name' : instance.name, 
                'status' : instance.status, 
                'photo' : instance.photo, 
                'location' : instance.location,
                'space' : instance.space,
                'bikes' : list(Bike.objects.filter(station_id_id = instance.id).values()),
        } 
class HistoryJourneySerializer(serializers.ModelSerializer):
    startStation = StationSerializer()
    stopStation = StationSerializer()
    
    class Meta:
        model = Journey
        fields = '__all__'
class JourneySerializer(serializers.ModelSerializer):

    class Meta:
        model = Journey
        fields = '__all__'
    def create(self, validated_data):
        # try:
        #     validated_data['startStation'] > 0
        # except:
        #     raise serializers.ValidationError({"empty_startStation": "You must put a startStation in the POST body"})
        
        validated_data.startStation = StationSerializer(validated_data['startStation'])
        bikes = list(validated_data.startStation.data.values())[6] #Position 6 is the bikes position may change 
        
        if len(Journey.objects.filter(user = validated_data['user'], stopStation = None)) > 0:
            raise serializers.ValidationError({"already_on_joruney": "You're already on a journey, finish it first to start another!"})
        if not Station.objects.filter(id=validated_data['startStation'].id).exists():
            raise serializers.ValidationError({"no_station": "That station doesn't exists!"})
        if len(bikes) <= 0:
            raise serializers.ValidationError({"not_enough_bikes": "There are no bikes in this station"})      
        print(list(bikes[0].values())[0])
        Bike.objects.filter(id = list(bikes[0].values())[0]).update(station_id_id=None)
        return Journey.objects.create(
            user=validated_data['user'],
            startStation = validated_data['startStation'],
            start = validated_data['start'],
            bike_id = list(bikes[0].values())[0]
        )
    def stop(self, validated_data):
        # try:
            # validated_data.stopStation == None
        # except:
            # raise serializers.ValidationError({"empty_stopStation": "You must put a stopStation in the POST body"})
        validated_data.stopStation = StationSerializer(validated_data['stopStation'])
        bikes = list(validated_data.stopStation.data.values())[6]
        space = list(validated_data.stopStation.data.values())[5]
        journey = Journey.objects.filter(user = validated_data['user'], stopStation = None)
        if len(journey) != 1:
            raise serializers.ValidationError({"not_in_a_journey": "You're not in a journey, start one!"})
        if not Station.objects.filter(id=validated_data['stopStation'].id).exists():
            raise serializers.ValidationError({"no_station": "That station doesn't exists!"})
        if len(bikes) >= space:
            raise serializers.ValidationError({"full_station": "We're sorry this station is full, try with another one."})
        # print(list(list(journey.values())[0].values()))
        # print(datetime.now(timezone.utc))
        # print(datetime.now(timezone.utc) - list(list(journey.values())[0].values())[6])
        Bike.objects.filter(id = list(list(journey.values())[0].values())[5]).update(station_id_id=validated_data['stopStation'])
        journey.update(stopStation=validated_data['stopStation'], time = datetime.now(timezone.utc) - list(list(journey.values())[0].values())[6])
        # Journey.objects.filter(user = validated_data['user'], stopStation = None).update(stopStation=validated_data['stopStation'])´

