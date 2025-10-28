from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import (
    UserSerializer,
    CustomTokenObtainPairSerializer,
    AvoidIngredientsSerializer,
)


# Create your views here.
@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request: any):
    if request.method == "POST":
        serialized_data = UserSerializer(data=request.data)
        if serialized_data.is_valid():
            serialized_data.save()
            token_serializer = CustomTokenObtainPairSerializer(
                data={
                    "username": request.data.get("username"),
                    "password": request.data.get("password"),
                }
            )
        if token_serializer.is_valid():
            return Response(
                token_serializer.validated_data, status=status.HTTP_201_CREATED
            )
        return Response({serialized_data.errors}, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
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
        except:
            return Response(
                {"error": "An unexpected error occurred"},
                status=status.HTTP_400_BAD_REQUEST,
            )
