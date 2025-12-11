from rest_framework.decorators import (
    api_view,
    permission_classes,
)
from rest_framework import status
from rest_framework.response import Response
from .models import Ingredients
from .serializer import IngredientSerializer
import re
import logging


# Create your views here.
@api_view(["POST"])
@permission_classes([])
def check_ingredients(request: any):
    if request.method == "POST":
        avoid_ing = None
        if request.user.is_authenticated:
            avoid_ing = request.user.avoid_ingredients
        else:
            avoid_ing = request.data.get("personalIngredients", [])
        ingredients_data = request.data.get("data", {})
        serializer = IngredientSerializer(
            data={"ingredients": ingredients_data.get("ingredients", "")}
        )
        try:
            if serializer.is_valid():
                ingredients = serializer.validated_data.get("ingredients", "")

                comedogenic_ingredients = handle_ingredients_check(
                    ingredients, avoid_ing
                )
                return Response(
                    {
                        "message": "handled ingredients",
                        "comedogenic_ingredients": comedogenic_ingredients,
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                logging.error(f"Ingredient error: ", serializer.errors)
                return Response(
                    {"message": "Invalid input", "errors": serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except Exception as e:
            logging.exception("Error in check_ingredients")
            return Response(
                {"message": "An unexpected error occurred", "error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )
    else:
        return Response(
            {"message": "Invalid HTTP method"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


def handle_ingredients_check(ingredients, avoid_ing):
    parsed = [
        s.strip().lower() for s in re.split(r",(?!\s?\d+(?:,\d+)*-\w)", ingredients)
    ]

    pore_clog_set = (
        Ingredients.objects.filter(name__in=parsed)
        .filter(category="comedogenic")
        .values_list("name", flat=True)
    )
    personal_avoids = [ing for ing in avoid_ing if ing.lower() in parsed]

    comedogenic_ingredients = list(pore_clog_set)
    comedogenic_ingredients.extend(personal_avoids)
    return comedogenic_ingredients


@api_view(["GET"])
@permission_classes([])
def get_all_ingredients(request: any):
    if request.method == "GET":
        try:
            all_ings = (
                Ingredients.objects.filter(category="comedogenic")
                .order_by("name")
                .distinct()
                .values_list("name", flat=True)
            )

            return Response(
                {
                    "message": "Fetched ingredients successfully",
                    "ingredients": all_ings,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            logging.exception("Fetching ingredients error")
            return Response(
                {"message": "An error occurred fetching ingredients", "error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )
    else:
        return Response(
            {"message": "Invalid HTTP method"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )
