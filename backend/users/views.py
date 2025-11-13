from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User
from .serializer import (
    UserSerializer,
    CustomTokenObtainPairSerializer,
    AvoidIngredientsSerializer,
)
import environ
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))


# Create your views here.
@api_view(["POST"])
@permission_classes([])
def register_user(request: any):
    if request.method == "POST":
        serialized_data = UserSerializer(data=request.data)
        token_serializer = None
        if serialized_data.is_valid():
            serialized_data.save()
            token_serializer = CustomTokenObtainPairSerializer(
                data={
                    "username": request.data.get("username"),
                    "password": request.data.get("password"),
                }
            )
        if token_serializer is not None and token_serializer.is_valid():
            return Response(
                token_serializer.validated_data, status=status.HTTP_201_CREATED
            )
        return Response(serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(
            {"error": "Invalid request method."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = CustomTokenObtainPairSerializer(data=request.data)
        if serializer.is_valid():
            response = Response(serializer.validated_data, status=status.HTTP_200_OK)
            response.set_cookie(
                key="refresh",
                value=serializer.validated_data["token"]["refresh"],
                max_age=3600 * 24,
                httponly=True,
                secure=env("PY_PRODUCTION"),
            )
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def logout(request: any):
    if request.method == "POST":
        try:
            refresh_cookie = request.COOKIES.get("refresh")
            if refresh_cookie:
                token = RefreshToken(refresh_cookie)
                token.blacklist()
                response = Response(
                    {"message": "Logged out successfully"}, status=status.HTTP_200_OK
                )
                response.delete_cookie("refresh")
                return response
        except (User.DoesNotExist, TokenError) as err:
            return Response({"message": str(err)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(
            {"error": "Invalid request method."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def upload_avoid_ingredients(request: any):
    if request.method == "PATCH":
        try:
            user = request.user
            serializer = AvoidIngredientsSerializer(
                user, data=request.data, partial=True
            )
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {"message": "Uploaded ingredients"}, status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"error": "Invalid Input"}, status=status.HTTP_400_BAD_REQUEST
                )
        except (User.DoesNotExist, TokenError) as err:
            return Response({"message": str(err)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(
            {"error": "Invalid request method."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )
