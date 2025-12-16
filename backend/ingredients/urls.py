from .views import check_ingredients, get_all_ingredients
from django.urls import path

urlpatterns = [
    path("analyze/", check_ingredients, name="analyze_ingredients"),
    path("", get_all_ingredients, name="get_ingredients"),
]
