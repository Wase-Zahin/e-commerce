from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import CustomUser
from django.views import View
from django.http import JsonResponse
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from .models import Payment
import json
import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt


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
            # If the user is authenticated, return the username
            return JsonResponse({"logged_in": True, "username": request.user.username})
        else:
            # If the user is not authenticated, return a message indicating so
            return JsonResponse({"logged_in": False, "message": "User is not authenticated"})


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


stripe.api_key = settings.STRIPE_TEST_SECRET_KEY


@csrf_exempt
def create_payment(request):

    intent = stripe.PaymentIntent.create(
        amount=1099,
        currency="cny",
        automatic_payment_methods={"enabled": True},
    )

    return JsonResponse({"client_secret": intent.client_secret})