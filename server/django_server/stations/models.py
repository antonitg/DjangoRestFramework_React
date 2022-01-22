
from pyexpat import model
from django.contrib.auth.models import User
import uuid
from django.db import models
from core.models import TimestampedModel
class Station(models.Model):

    id = models.AutoField(auto_created=True, primary_key=True, verbose_name='ID')
    photo = models.TextField(blank=False)
    name = models.TextField(blank=False)
    location = models.TextField(blank=False)
    space = models.IntegerField(blank=False, default=0)
    status = models.IntegerField(blank=True, default=1)


class Bike(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name = models.TextField(blank=True)
    status =  models.IntegerField(blank=False, default=1)
    time = models.IntegerField(blank=True)
    station_id = models.ForeignKey(Station, null=True, on_delete=models.SET_NULL)


class Journey(TimestampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    startStation = models.ForeignKey(Station,null=True, related_name='startStation', on_delete=models.SET_NULL)
    stopStation = models.ForeignKey(Station,null=True, related_name='stopStation', on_delete=models.SET_NULL)
    bike = models.ForeignKey(Bike, null=True, related_name='bike',on_delete=models.SET_NULL)
    start = models.DateTimeField(blank=True, null=True)
    cost = models.FloatField(blank=True, null=True)
    time = models.DurationField(blank=True, null=True)
    user = models.ForeignKey(User,null=True, related_name='user', on_delete=models.DO_NOTHING)
#   def __str__(self):
#         return str(self.name)