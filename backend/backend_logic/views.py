from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import CustomUser
from django.views import View
from django.http import JsonResponse
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
import json


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class SignUpView(viewsets.ModelViewSet):
    def post(self, request):
        # Retrieve the data from the request body
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # Create the user
        user = CustomUser.objects.create(
            username=username,
            email=email,
            password=make_password(password)
        )

        # Generate a CSRF token and store it in a cookie
        csrf_token = get_token(request)
        response = JsonResponse({'message': 'Success'})
        # Set the 'csrftoken' cookie in the response
        response.set_cookie('csrftoken', csrf_token,
                            httponly=True, samesite='Strict')

        # Return the response to the client
        return response


class CheckLoggedIn(View):
    def get(self, request):
        if request.user.is_authenticated:
            return JsonResponse({"logged_in": True})
        else:
            return JsonResponse({"logged_in": False})

class LoginView(viewsets.ModelViewSet):
    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            if check_password(password, user.password):
                login(request, user)
                print(user.is_authenticated)
                return JsonResponse({"message": "login successful!"})
            else:
                return JsonResponse({'message': 'Incorrect login credentials'})
        else:
            return JsonResponse({'message': 'Incorrect login credentials'})

class LogoutView(viewsets.ModelViewSet):
    def post(self, request):
        logout(request)
        return JsonResponse({"message": "You have been logged out!"})