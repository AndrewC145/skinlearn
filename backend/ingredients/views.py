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
    if isinstance(ingredients, list):
        parsed = [s.strip().lower() for s in ingredients if isinstance(s, str)]
    else:
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


def check_compatibility(ingredient_list):
    categories = ["AHA", "BHA", "retinol", "vitamin c", "acne treatment"]

    category_mapping = {category: [] for category in categories}
    compatibilities = (
        Ingredients.objects.filter(name__in=ingredient_list)
        .filter(category__in=categories)
        .values_list("name", "category")
    )

    for name, category in compatibilities:
        if category in category_mapping:
            category_mapping[category].append(name)

    bad_combos = [
        frozenset(["AHA", "BHA"]),
        frozenset(["AHA", "retinol"]),
        frozenset(["BHA", "retinol"]),
        frozenset(["vitamin c", "retinol"]),
        frozenset(["vitamin c", "AHA"]),
        frozenset(["vitamin c", "BHA"]),
        frozenset(["niacinamide", "vitamin c"]),
    ]

    present_categories = {cat for cat, ings in category_mapping.items() if ings}
    present_ingredients = set([name.lower() for name in ingredient_list])

    bad_mixes = []
    all_present = present_categories.union(present_ingredients)

    for combo in bad_combos:
        if combo.issubset(all_present):
            involved = {}
            for item in combo:
                if item in category_mapping:
                    involved[item] = category_mapping[item]
                elif item in present_ingredients:
                    involved[item] = [item]
            bad_mixes.append(
                {
                    "categories": list(combo),
                    "ingredients": involved,
                }
            )

    if bad_mixes:
        logging.warning(f"Detected incompatible ingredient combinations: {bad_mixes}")

    return bad_mixes


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
