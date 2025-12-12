from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register_user, name="register"),
    path("token/", views.CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", views.CustomTokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", views.logout, name="logout"),
    path(
        "ingredients/<int:pk>/",
        views.upload_avoid_ingredients,
        name="add_avoid_ingredients",
    ),
    path("products/<int:pk>/", views.get_user_products, name="get_user_products"),
]
