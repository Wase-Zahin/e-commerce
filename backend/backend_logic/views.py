from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import CustomUser
from django.views import View
from django.http import JsonResponse
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import authenticate, login
from django.middleware.csrf import get_token
from rest_framework_simplejwt.tokens import RefreshToken
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

        # Authenticate the user
        # user = authenticate(username=username, password=password)
        # if user.id == None:
        #     login(request, user)

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
        if request.user is not None:
            return JsonResponse({"message": str(request.user)})
        else:
            return JsonResponse({"message": "user is not verified"})
        if request.user.is_authenticated:
            print('request.user:', request.user)
            print('request.user.is_authenticated:', request.user.is_authenticated)
            return JsonResponse({'logged_in': True}, {'user': request.user})
        else:
            print('user is not authenticated');
            return JsonResponse({'user': request.user})

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
      
        # Generate a CSRF token and store it in a cookie
        csrf_token = get_token(request)
        response = JsonResponse({'message': 'Success'})
        # Set the 'csrftoken' cookie in the response
        response.set_cookie('csrftoken', csrf_token, httponly=True, samesite='Strict')

#         I'm using django+react. I'm trying to log users in. The signup function works properly. I attempt to log users in like this: 
# `login(request, user)
# return JsonResponse({"message": "login successful!"})`

# From the frontend I submit a form to log the user in. After submitting the form, I push the user to the homepage where I have another button called 'check' to check if the user is logged in. The check view I used like this:
# `class CheckLoggedIn(View):
#     def get(self, request):
#         if request.user is not None:
#             return JsonResponse({"message": str(request.user)})
#         else:
#             return JsonResponse({"message": "user is not verified"});`

# So, the output is, When I click the login button to submit the form, I get the response in the frontend browser console `{message: 'login successful!'}` And the page gets pushed to the homepage. However in the homepage, When I click the 'check' button, I get the response in the frontend browser console `{message: 'AnonymousUser'}`

# What can be the reason? And how to fix it?