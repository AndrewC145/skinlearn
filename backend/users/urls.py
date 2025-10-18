from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register_user, name="register"),
    path("token/", views.CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
]
