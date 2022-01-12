from django.db import models

# Create your models here.
class User(models.Model):
    name = models.TextField(blank=True)
    mail = models.TextField(blank=True)
    bio = models.TextField(blank=True)
