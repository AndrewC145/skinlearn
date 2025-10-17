from rest_framework import serializers
from .models import Ingredients


class IngredientSerializer(serializers.Serializer):
    ingredients = serializers.ListField(
        child=serializers.CharField(), allow_empty=False
    )
