from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
    throttle_classes,
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User
from .serializer import (
    RegisterSerializer,
    UserSerializer,
    CustomTokenObtainPairSerializer,
    AvoidIngredientsSerializer,
)
from django.contrib.auth import get_user_model
from rest_framework.throttling import AnonRateThrottle
import environ
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))


# Create your views here.
class RegisterThrottle(AnonRateThrottle):
    rate = "10/hour"


@api_view(["POST"])
@permission_classes([])
@throttle_classes([RegisterThrottle])
def register_user(request: any):
    if request.method == "POST":
        serialized_data = RegisterSerializer(data=request.data)
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


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh")
        if not refresh_token:
            return Response(
                {"error": "Refresh token missing."}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            token = RefreshToken(refresh_token)
            access_token = str(token.access_token)
            user_id = token.payload.get("user_id")
            User = get_user_model()
            user = User.objects.get(id=user_id)
            user_info = UserSerializer(user).data

            return Response(
                {"access": access_token, "user": user_info}, status=status.HTTP_200_OK
            )
        except TokenError as e:
            return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)


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


@api_view(["PATCH", "GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def upload_avoid_ingredients(request, pk):
    if request.method == "PATCH":
        try:
            user = User.objects.get(pk=pk)
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
    elif request.method == "GET":
        try:
            user = User.objects.get(pk=pk)
            serializer = AvoidIngredientsSerializer(user)

            return Response({"ingredients": serializer.data}, status=status.HTTP_200_OK)
        except (User.DoesNotExist, TokenError) as err:
            return Response({"message": str(err)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(
            {"error": "Invalid request method."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_user_products(request, pk):
    if request.method == "GET":
        try:
            user = User.objects.get(pk=pk)
            serializer = UserSerializer(user).data

            return Response({"data": serializer}, status=status.HTTP_200_OK)
        except User.DoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
