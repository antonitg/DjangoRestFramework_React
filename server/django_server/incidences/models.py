from urllib import response
from django.db import models

# Create your models here.

from pyexpat import model
from django.contrib.auth.models import User
import uuid
from core.models import TimestampedModel
from stations.models import Bike, Journey, Station


class Incidence(TimestampedModel):

    id = models.AutoField(auto_created=True, primary_key=True, verbose_name='ID')
    status = models.IntegerField(blank=True, default=1)
    journey = models.ForeignKey(Journey, null=True, on_delete=models.SET_NULL)
    info = models.TextField(blank=True)
    response = models.TextField(blank=True)