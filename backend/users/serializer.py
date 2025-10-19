from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password", "skin_type"]
        extra_kwargs = {"password": {"write_only": True}}

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
