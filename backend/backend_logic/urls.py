from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, LoginView, SignUpView, CheckLoggedIn, LogoutView, create_payment

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('create_payment/', create_payment, name='create_payment'),
    path('users/check_logged_in/', CheckLoggedIn.as_view(), name='check_logged_in'),
    path('users/signup/', SignUpView.as_view({'get': 'list'}), name='signup'),
    path('users/login/', LoginView.as_view({'get': 'list'}), name='login'),
    path('users/logout/', LogoutView.as_view({'get': 'list'}), name='logout'),
    path('', include(router.urls)),
]