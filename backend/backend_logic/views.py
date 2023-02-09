from rest_framework import viewsets
from django.http import JsonResponse
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def user_list_view(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)