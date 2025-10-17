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
    comedogenic_results: list[str] = []
    if request.method == "POST":
        ingredients_json = IngredientSerializer(data=request.data)
        try:
            if ingredients_json.is_valid():
                ingredients: list[str] = ingredients_json.data["ingredients"]
                for ing in ingredients:
                    if Ingredients.objects.filter(name=ing.lower()).exists():
                        comedogenic_results.append(ing)
            return Response(
                {
                    "message": "handled ingredients",
                    "comedogenic_ingredients": comedogenic_results,
                },
                status=status.HTTP_200_OK,
            )
        except:
            return Response(
                {
                    "message": "An unexpected error went wrong while analyzing ingredients"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
