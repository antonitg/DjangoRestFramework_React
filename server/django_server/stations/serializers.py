from datetime import date, datetime , timezone
from xmlrpc.client import DateTime
from django.db.models import F
from profiles.models import Profile, Transactions
from .models import Journey, Station, Bike
from rest_framework import serializers
from django.core import serializers as core_serializers
from profiles.seralizers import ProfileSerializer
from core.serializers import DynamicFieldsModelSerializer
# from rest_framework.validators import UniqueValidator

class BikeSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Bike
        fields = "__all__"
    def delete(self, instance, valdiated_data):
        Bike.objects.filter(id=instance.initial_data.get("uid")).delete()
    def create(self, validated_data):
        if Bike.objects.filter(station_id_id = validated_data['station_id'].id).count() >= Station.objects.filter(id=validated_data['station_id'].id).first().space:
            raise serializers.ValidationError({"full_station": "This station is full try with another one."})
        return Bike.objects.create(status=1, name=validated_data['name'], station_id_id=validated_data['station_id'].id,time=0)
    def update(self, instance,  validated_data):
        try:
            if not Bike.objects.filter(id=instance.initial_data.get("uid")).exists():
                raise serializers.ValidationError({"error_updating": "This stations does not exists."})
            instance = Bike.objects.filter(id=instance.initial_data.get("uid")).first()
        except:
            raise serializers.ValidationError({"invalid_data_type": "ID must be an string."})
        # print(Station.objects.filter(id=validated_data['station_id'].id).first())
        # print(Station.objects.filter(id=validated_data['station_id'].id).first().space)

        if Bike.objects.filter(station_id_id = validated_data['station_id'].id).count() >= Station.objects.filter(id=validated_data['station_id'].id).first().space:
            raise serializers.ValidationError({"full_station": "This station is full try with another one."})
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
class StationSerializer(DynamicFieldsModelSerializer):

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
    def create(self, validated_data):  
        if Station.objects.create(name=validated_data['name'],location=validated_data['location'],photo=validated_data['photo'],space=validated_data['space']):
            return "Created"
        raise serializers.ValidationError({"error_creating": "An strange error ocurred during the creation."})

    def update(self, instance,validated_data):
        nBikes = Bike.objects.filter(station_id_id = instance.initial_data.get("id")).count()
        if nBikes > validated_data['space']:
            raise serializers.ValidationError({"error_updating": "Wrong space number, it must be at least as the number of bikes in this station ("+str(nBikes)+"), try with more space or remove/move some bikes!"})
        try:
            if not Station.objects.filter(id=instance.initial_data.get("id")).exists():
                raise serializers.ValidationError({"error_updating": "This stations does not exists."})
            instance = Station.objects.filter(id=instance.initial_data.get("id")).first()
        except:
            raise serializers.ValidationError({"invalid_data_type": "ID must be an string."})

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
    def delete(self, instance, validated_data):
        actual = Station.objects.get(id = instance.initial_data.get('id'))
        if Bike.objects.filter(station_id_id = actual.id).count() > 0:
            raise serializers.ValidationError({"problem_deleting": "There are bikes in this station, to remove it first remove or replace bikes from it."})
        actual.delete()
        
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
        if Profile.objects.filter(id=validated_data['user'].id).first().money <= 0:
            raise serializers.ValidationError({"not_enough_money": "You don't have enough money!"})
        if not Station.objects.filter(id=validated_data['startStation'].id).exists():
            raise serializers.ValidationError({"no_station": "That station doesn't exists!"})
        if len(bikes) <= 0:
            raise serializers.ValidationError({"not_enough_bikes": "There are no bikes in this station"})      
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

