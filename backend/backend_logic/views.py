from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import CustomUser
from django.views import View
from django.http import HttpResponseBadRequest, JsonResponse
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from django.middleware.csrf import get_token
from rest_framework_simplejwt.tokens import RefreshToken
import json

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class SignUpView(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        # Retrieve the data from the request body
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not email:
            return HttpResponseBadRequest('Email is required')

        # Create the user
        user = CustomUser.objects.create(
            username=username,
            email=email,
            password=make_password(password)
        )

        # Generate a token for the user
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        # Return the token to the client
        return JsonResponse({
            'access_token': access_token,
            'refresh_token': refresh_token,
        })

class GetCSRFTokenView(View):
    def get(self, request, *args, **kwargs):
        csrf_token = get_token(request)
        response = JsonResponse({'csrf_token': csrf_token}, safe=False)
        response.set_cookie('csrftoken', csrf_token)
        return response

class LoginView(View):
    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'message': 'Incorrect login credentials'})

    def get(self, request, *args, **kwargs):
        return JsonResponse({'message': "success!"})
