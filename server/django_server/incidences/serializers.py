from core.serializers import DynamicFieldsModelSerializer
from incidences.models import Incidence
from rest_framework import serializers

class IncidenceSerializer(DynamicFieldsModelSerializer):

    class Meta:
        model = Incidence
        fields = '__all__'
    def to_representation(self, instance):
        return {
                'id' : instance.id,
                'response' : instance.response, 
                'status' : instance.status, 
                'info' : instance.info, 
                'user' : instance.journey.user.username,
                'startStation': instance.journey.startStation.name,
                'stopStation': instance.journey.stopStation.name,
                'bikeName': instance.journey.bike.name,
                'journeyId':instance.journey.id

        }
    def create(self, validated_data):  
        if Incidence.objects.create(info=validated_data['info'],journey=validated_data['journey']):
            return "Created"
        raise serializers.ValidationError({"error_creating": "An strange error ocurred during the creation."})
    def close(self, validated_data):
        if Incidence.objects.filter(journey=validated_data['journey']).update(response=validated_data['response'],status=2):
            return "Closed"
        raise serializers.ValidationError({"error_creating": "An strange error ocurred during the creation."})
 