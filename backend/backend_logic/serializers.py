from rest_framework import serializers
from .models import USER

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ('id', 'user', 'password', 'joined_date')
