from django.db import models

from django.db import models

class USER(models.Model):
    user = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    joined_date = models.DateField()