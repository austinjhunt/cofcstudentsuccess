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

class BlogPost(models.Model):
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    day = models.CharField(max_length=25,default="01")
    month = models.CharField(max_length=25,default="January")
    year = models.CharField(max_length=25,default="2020")
    content = models.TextField(default="")
    preview = models.TextField(default="")
    title = models.CharField(max_length=50,default="")
    tags = models.CharField(max_length=65,default="")
    image = models.CharField(max_length=65,default="bg_1.jpg")