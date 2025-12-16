from rest_framework import serializers


class IngredientSerializer(serializers.Serializer):
    ingredients = serializers.CharField(allow_blank=False)
