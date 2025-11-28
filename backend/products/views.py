from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from .serializer import ProductSubmissionSerializer
from .models import Products, ProductSubmission


# Create your views here.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def submit_product(request: any):
    if request.method == "POST":
        try:
            serialized_data = ProductSubmissionSerializer(data=request.data)
            if serialized_data.is_valid():
                serialized_data.save()
                return Response(serialized_data, status=status.HTTP_201_CREATED)
            return Response(serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    else:
        return Response(
            {"error": "Invalid request method."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def superuser_dashboard(request: any):
    if request.method == "GET":
        if request.user.is_superuser:
            submissions = ProductSubmission.objects.all()
            serializer = ProductSubmissionSerializer(submissions, many=True)
            return Response({"submissions": serializer.data})
        return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)
    return Response(
        {"error": "Invalid request method."},
        status=status.HTTP_405_METHOD_NOT_ALLOWED,
    )
