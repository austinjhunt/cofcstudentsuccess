from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)

class Meta(models.Model):
    value = models.TextField(default="")
    attribute_name = models.CharField(max_length=50, default="")

class SliderItem(models.Model):
    background_image = models.CharField(max_length=50, default="bg_1.jpg")
    description = models.TextField(default="Slider item description")
    header = models.TextField(default="Slider item header")