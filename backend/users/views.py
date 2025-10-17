from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from .serializer import UserSerializer


# Create your views here.
@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request: any):
    if request.method == "POST":
        serialized_data = UserSerializer(data=request.data)
        if serialized_data.is_valid():
            serialized_data.save()
            return Response(
                {"message": "User created successfully"}, status=status.HTTP_201_CREATED
            )
        return Response({serialized_data.errors}, status=status.HTTP_400_BAD_REQUEST)
