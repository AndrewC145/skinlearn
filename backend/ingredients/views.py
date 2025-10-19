from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from .models import Ingredients
from .serializer import IngredientSerializer


# Create your views here.
@api_view(["POST"])
@permission_classes([AllowAny])
def check_ingredients(request: any):
    if request.method == "POST":
        if request.user.is_authenticated:
            avoid_ing = request.user.avoid_ingredients
        serializer = IngredientSerializer(data=request.data)

        try:
            if serializer.is_valid():
                ingredients = serializer.data.get("ingredients", [])
                comedogenic_results = [
                    ing
                    for ing in ingredients
                    if Ingredients.objects.filter(name=ing.lower()).exists()
                    or ing in avoid_ing
                ]
                return Response(
                    {
                        "message": "handled ingredients",
                        "comedogenic_ingredients": comedogenic_results,
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
