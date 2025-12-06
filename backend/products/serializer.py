from rest_framework import serializers
from .models import Products, ProductSubmission
from ingredients.models import Ingredients
from django.contrib.postgres.search import TrigramSimilarity


def validate_name(value):
    if len(value) <= 4:
        raise serializers.ValidationError("Product name is too short")

    dup1 = (
        ProductSubmission.objects.annotate(similarity=TrigramSimilarity("name", value))
        .filter(similarity__gt=0.7)
        .order_by("-similarity")
    )

    dup2 = (
        Products.objects.annotate(similarity=TrigramSimilarity("name", value))
        .filter(similarity__gt=0.7)
        .order_by("-similarity")
    )

    if dup1.exists() or dup2.exists():
        raise serializers.ValidationError("There already exists a similar item")

    return value.lower()


def validate_ingredients(value):
    cleaned = [v.strip().lower() for v in value if v.strip()]

    if len(cleaned) < 3:
        raise serializers.ValidationError("At least 3 ingredients are required")

    return cleaned


def validate_category(value):
    if value not in Products.category:
        raise serializers.ValidationError("Product is not part of a valid category")
    return value


class ProductSerializer(serializers.ModelSerializer):
    ingredients = serializers.ListField(
        child=serializers.CharField(), allow_empty=False
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
        return validate_name(value)

    def validate_ingredients(self, value):
        return validate_ingredients(value)

    def validate_category(self, value):
        return validate_category(value)

    def create(self, validated_data):
        ingredient_names = validated_data.pop("ingredients")
        product = Products.objects.create(**validated_data)
        ingredient_objs = []
        for name in ingredient_names:
            ingredient, _ = Ingredients.objects.get_or_create(name=name)
            ingredient_objs.append(ingredient)
        product.ingredients.set(ingredient_objs)
        return product


class ProductInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ["id", "name", "brand", "category", "raw_ingredients", "image"]


class ProductSubmissionSerializer(serializers.ModelSerializer):
    ingredients = serializers.ListField(child=serializers.CharField(), write_only=True)

    ingredient_names = serializers.SerializerMethodField(read_only=True)

    created_by = serializers.CharField(source="created_by.username", read_only=True)

    class Meta:
        model = ProductSubmission
        fields = [
            "id",
            "name",
            "brand",
            "ingredients",
            "ingredient_names",
            "raw_ingredients",
            "created_by",
        ]
        extra_kwargs = {"created_by": {"read_only": True}}

    def validate_name(self, value):
        return validate_name(value)

    def validate_brand(self, value):
        if len(value) > 50:
            raise serializers.ValidationError(
                "Brand name must be less than 50 characters"
            )
        return value

    def validate_ingredients(self, value):
        return validate_ingredients(value)

    def create(self, validated_data):
        ingredient_names = validated_data.pop("ingredients")
        submission = ProductSubmission.objects.create(**validated_data)

        objs = []
        for raw in ingredient_names:
            normalized = raw.strip().lower()

            try:
                ingredient = Ingredients.objects.filter(name__iexact=normalized).first()
                if ingredient:
                    objs.append(ingredient)
            except Ingredients.DoesNotExist:
                pass

        submission.ingredients.set(objs)
        submission.raw_ingredients = ingredient_names
        submission.save()
        return submission

    def get_ingredient_names(self, obj):
        return [i.name for i in obj.ingredients.all()]
