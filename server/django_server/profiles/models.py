from django.contrib.auth.models import User
from django.db import models
from core.models import TimestampedModel
# Create your models here.
class Profile(TimestampedModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    money = models.FloatField(default=0)
    isWorker = models.IntegerField(default=0)
class Transactions(TimestampedModel):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    amount = models.FloatField(null=False)