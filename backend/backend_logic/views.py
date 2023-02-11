from http.client import HTTPResponse
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import CustomUser
from django.views import View
from django.http import JsonResponse
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token
import json


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class GetCSRFTokenView(View):
    def get(self, request, *args, **kwargs):
        response = JsonResponse({'csrf_token': get_token(request)})
        response["Access-Control-Allow-Origin"] = "http://127.0.0.1:3000"
        response["Access-Control-Allow-Methods"] = "GET, POST"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        response["Allow"] = "GET, POST"
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


class SignUpView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        print(data)
        if not all([username, email, password]):
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        # Check if the user already exists
        if CustomUser.objects.filter(username=username).exists() or CustomUser.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Username or email already taken'}, status=400)

        # Create the user
        user = CustomUser.objects.create(
            username=username,
            email=email,
            password=make_password(password)
        )
        response = JsonResponse(
            {'message': 'User created successfully'}, status=201)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    def options(self, request, *args, **kwargs):
        response = HTTPResponse()
        response["Access-Control-Allow-Origin"] = "http://127.0.0.1:3000"
        response["Access-Control-Allow-Methods"] = "GET, POST"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        response["Allow"] = "GET, POST"
        return response

    def get(self, request, *args, **kwargs):
        return JsonResponse({'message': 'Welcome to the sign up page!'})
