from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register_user, name="register"),
    path("token/", views.CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("logout/", views.logout, name="logout"),
    path("ingredients/", views.upload_avoid_ingredients, name="add_avoid_ingredients"),
]
