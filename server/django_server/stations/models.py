
from tkinter import CASCADE
from django.db import models

class Station(models.Model):

    id = models.AutoField(auto_created=True, primary_key=True, verbose_name='ID')
    photo = models.TextField(blank=False)
    name = models.TextField(blank=False)
    location = models.TextField(blank=False)
    space = models.IntegerField(blank=False, default=0)
    status = models.IntegerField(blank=True, default=1)
    # def __str__(self):
    #     return str(self.name)
class Bike(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    name = models.TextField(blank=True)
    status =  models.IntegerField(blank=False, default=1)
    time = models.IntegerField(blank=True)
    station_id = models.ForeignKey(Station, null=True, on_delete=models.SET_NULL)


#   def __str__(self):
#         return str(self.name)