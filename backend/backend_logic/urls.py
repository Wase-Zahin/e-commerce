from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, SignUpView, LoginView, GetCSRFTokenView

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('users/signup/', SignUpView.as_view(), name='signup'),
    path('users/get_csrf/', GetCSRFTokenView.as_view(), name='get_csrf'),
    path('login', LoginView.as_view(), name='login'),
    path('', include(router.urls)),
]