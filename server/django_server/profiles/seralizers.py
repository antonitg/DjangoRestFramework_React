from rest_framework import serializers
from django.db.models import F
from .models import Profile, Transactions
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('money',)
class TransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = "__all__"
    def create(self, validated_data):
        if validated_data['amount'] < 0:
            raise serializers.ValidationError({"invalid_value": "The amount value is invalid!"})
        Transactions.objects.create(
            user=validated_data['user'],
            # id=validated_data['user'],
            amount=validated_data['amount']
        )
        Profile.objects.filter(user=validated_data['user']).update(money = F('money')+validated_data['amount'])

