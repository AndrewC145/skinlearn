from .views import check_ingredients
from django.urls import path

urlpatterns = [path("analyze", check_ingredients, name="analyze_ingredients")]
