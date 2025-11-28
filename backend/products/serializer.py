from rest_framework import serializers
from .models import Products, ProductSubmission
from ingredients.models import Ingredients
from django.contrib.postgres.search import TrigramSimilarity


def validate_name(value):
    if len(value) <= 4:
        raise serializers.ValidationError("Product name is too short")

    similar = (
        Ingredients.objects.annotate(similarity=TrigramSimilarity("name", value))
        .filter(similarity__gt=0.7)
        .order_by("-similarity")
    )

    if similar.exists():
        raise serializers.ValidationError("There already exists a similar item")

    return value


def validate_ingredients(value):
    if len(value) <= 3:
        raise serializers.ValidationError("There must be more than 3 ingredients")
    return value


def validate_category(value):
    if value not in Products.category:
        raise serializers.ValidationError("Product is not part of a valid category")
    return value


class ProductSerializer(serializers.ModelSerializer):
    ingredients = serializers.SlugRelatedField(
        slug_field="name", queryset=Ingredients.objects.all(), many=True
    )

    class Meta:
        model = Products
        fields = [
            "name",
            "brand",
            "category",
            "ingredients",
            "user_added",
            "created_by",
            "created_at",
            "image",
        ]
        extra_kwargs = {
            "user_added": {"read_only": True},
            "is_approved": {"read_only": True},
            "created_by": {"read_only": True},
            "created_at": {"read_only": True},
            "image": {"read_only": True},
        }

        def validate_name(self, value):
            return validate_name(self, value)

        def validate_ingredients(self, value):
            return validate_ingredients(self, value)

        def validate_category(self, value):
            return validate_category(self, value)

        def create(self, validated_data):
            return Products.objects.create(**validated_data)


class ProductSubmissionSerializer(serializers.ModelSerializer):
    ingredients = serializers.SlugRelatedField(
        slug_field="name", queryset=Ingredients.objects.all(), many=True
    )

    class Meta:
        model = ProductSubmission
        fields = ["name", "brand", "ingredients", "created_by"]
        extra_kwargs = {"created_by": {"read_only": True}}

        def validate_name(self, value):
            return validate_name(self, value)

        def validate_ingredients(self, value):
            return validate_ingredients(self, value)

        def validate_category(self, value):
            return validate_category(self, value)

        def create(self, validated_data):
            return ProductSubmission.objects.create(**validated_data)
