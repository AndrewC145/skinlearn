from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from .models import Ingredients
from .serializer import IngredientSerializer
import re


# Create your views here.
@api_view(["POST"])
@permission_classes([])
def check_ingredients(request: any):
    if request.method == "POST":
        if request.user.is_authenticated:
            avoid_ing = request.user.avoid_ingredients
        serializer = IngredientSerializer(data=request.data)
        try:
            if serializer.is_valid():
                ingredients = serializer.validated_data.get("ingredients", "")

                parsed = [
                    s.strip().lower()
                    for s in re.split(r",(?!\s?\d+(?:,\d+)*-\w)", ingredients)
                ]

                comedogenic_ingredients = Ingredients.objects.filter(name__in=parsed)
                return Response(
                    {
                        "message": "handled ingredients",
                        "comedogenic_ingredients": list(
                            comedogenic_ingredients.values()
                        ),
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"message": "Invalid input"}, status=status.HTTP_400_BAD_REQUEST
                )

        except:
            return Response(
                {"message": "An unexpected error occurred"},
                status=status.HTTP_400_BAD_REQUEST,
            )
    else:
        return Response(
            {"message": "Invalid HTTP method"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )
