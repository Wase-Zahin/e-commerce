from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    pass

class Payment(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3)
    payment_method_id = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    email = models.EmailField()
    line1 = models.CharField(max_length=100)
    line2 = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=10)
    country = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
