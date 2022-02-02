from datetime import date, datetime , timezone
from django.db.models import F
from profiles.models import Profile, Transactions
from .models import Journey, Station, Bike
from rest_framework import serializers
from django.core import serializers as core_serializers
from profiles.seralizers import ProfileSerializer
from core.serializers import DynamicFieldsModelSerializer
# from rest_framework.validators import UniqueValidator

class BikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        # fields = None
        fields = "__all__"


class StationSerializer(DynamicFieldsModelSerializer):

    class Meta:
        model = Station
        fields = '__all__'
        # fields = []
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
    def create(self, validated_data):  
        if Station.objects.create(name=validated_data['name'],location=validated_data['location'],photo=validated_data['photo'],space=validated_data['space']):
            return "Created"
        raise serializers.ValidationError({"error_creating": "An strange error ocurred during the creation."})

    def update(self, instance,validated_data):
        print("instance")
        try:
            if not Station.objects.filter(id=instance.initial_data.get("id")).exists():
                raise serializers.ValidationError({"error_updating": "This stations does not exists."})
            instance = Station.objects.filter(id=instance.initial_data.get("id")).first()
        except:
            raise serializers.ValidationError({"invalid_data_type": "ID must be an string."})
        print("instance")

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        print("instance")

        print("instance")
        instance.save()
        print(instance)
        return instance
    
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
        print(Profile.objects.filter(id=validated_data['user'].id))
        if len(Journey.objects.filter(user = validated_data['user'], stopStation = None)) > 0:
            raise serializers.ValidationError({"already_on_joruney": "You're already on a journey, finish it first to start another!"})
        if Profile.objects.filter(id=validated_data['user'].id).first().money <= 0:
            raise serializers.ValidationError({"not_enough_money": "You don't have enough money!"})
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
        Bike.objects.filter(id = list(list(journey.values())[0].values())[5]).update(station_id_id=validated_data['stopStation'])
        totaltime = datetime.now(timezone.utc) - list(list(journey.values())[0].values())[6]
        cost = round(float(((totaltime.total_seconds()) /60) / 100),2)
        Profile.objects.filter(id=validated_data['user'].id).update(money = F('money')-cost)
        journey.update(stopStation=validated_data['stopStation'], time=totaltime, cost = cost )
        if cost > 0:
            Transactions.objects.create(user=validated_data['user'],amount=-cost)

