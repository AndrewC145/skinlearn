from rest_framework import serializers


class IngredientSerializer(serializers.Serializer):
    ingredients = serializers.ListField(
        child=serializers.CharField(), allow_empty=False
    )
    user_id = serializers.IntegerField(required=False)
