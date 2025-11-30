from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    confirmPassword = serializers.CharField(min_length=8)

    class Meta:
        model = User
        fields = ["username", "email", "password", "confirmPassword", "skin_type"]
        extra_kwargs = {
            "password": {"write_only": True},
            "confirmPassword": {"write_only": True},
        }

    def validate(self, attrs):
        if attrs["password"] != attrs["confirmPassword"]:
            raise serializers.ValidationError(["Passwords do not match"])
        return attrs

    def validate_password(self, password):
        validate_password(password)
        return password

    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            email=validated_data["email"],
            skin_type=validated_data["skin_type"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = {
            "token": super().validate(attrs),
            "id": self.user.id,
            "username": self.user.username,
            "avoid_ingredients": self.user.avoid_ingredients,
            "superuser": self.user.is_superuser,
        }

        return data


class AvoidIngredientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["avoid_ingredients"]

    def update(self, instance, validated_data):
        instance.avoid_ingredients = validated_data.get(
            "avoid_ingredients", instance.avoid_ingredients
        )
        instance.save()
        return instance
