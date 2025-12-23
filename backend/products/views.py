from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
    throttle_classes,
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from .serializer import (
    ProductSubmissionSerializer,
    ProductInformationSerializer,
    RoutineSerializer,
)
from .models import Products, ProductSubmission
from rest_framework.throttling import UserRateThrottle
import re
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from ingredients.views import handle_ingredients_check
from ingredients.models import Ingredients


# Create your views here.
class SubmitProductThrottle(UserRateThrottle):
    rate = "5/hour"


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
@throttle_classes([SubmitProductThrottle])
def submit_product(request: any):
    if request.method == "POST":
        try:
            request.data["ingredients"] = [
                s.strip().lower() for s in re.split(r",|/", request.data["ingredients"])
            ]
            serialized_data = ProductSubmissionSerializer(data=request.data)

            if serialized_data.is_valid():
                serialized_data.save(created_by=request.user)
                return Response(
                    {"message": "Product submitted successfully!"},
                    status=status.HTTP_201_CREATED,
                )

            return Response(
                {"error": serialized_data.errors}, status=status.HTTP_400_BAD_REQUEST
            )
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


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def product_submission_delete(request, pk):
    if request.method == "DELETE":
        if request.user.is_superuser:
            try:
                instance = ProductSubmission.objects.get(pk=pk)
                instance.delete()

                return Response(
                    {"message": "Deleted successfully"}, status=status.HTTP_200_OK
                )
            except ProductSubmission.DoesNotExist as e:
                return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(
                {"error": "You are not an admin"}, status=status.HTTP_403_FORBIDDEN
            )
    return Response(
        {"error": "Invalid request method."},
        status=status.HTTP_405_METHOD_NOT_ALLOWED,
    )


@api_view(["GET"])
@permission_classes([])
def get_product(request, pk):
    if request.method == "GET":
        try:
            product = Products.objects.get(pk=pk)
            serializer = ProductInformationSerializer(product)
            return Response(
                {
                    "Product": serializer.data,
                },
                status=status.HTTP_200_OK,
            )
        except Products.DoesNotExist as e:
            return Response({"error": str(e)})


class CustomPageNumberPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 50


@api_view(["GET"])
@permission_classes([])
def list_products(request):
    if request.method == "GET":
        products = Products.objects.all().order_by("id")

        product_pagination = CustomPageNumberPagination()

        search_query = request.query_params.get("search", None)

        if search_query:
            products = Products.objects.filter(
                Q(name__icontains=search_query) | Q(brand__icontains=search_query)
            )

        result_page = product_pagination.paginate_queryset(products, request)
        serializer = ProductInformationSerializer(result_page, many=True)

        paginated_products = product_pagination.get_paginated_response(serializer.data)

        return paginated_products
    return Response(
        {"error": "Invalid request method."}, status=status.HTTP_405_METHOD_NOT_ALLOWED
    )


@api_view(["POST"])
@permission_classes([])
def save_and_analyze_product(request):
    if request.method == "POST":
        serializer = RoutineSerializer(data=request.data)
        if serializer.is_valid():
            product_data = serializer.validated_data["product"]
            product_id = product_data["id"]
            day_routine = serializer.validated_data["day_routine"]

            try:
                product = Products.objects.get(id=product_id)
            except Products.DoesNotExist as e:
                return Response(
                    {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
                )

            if request.user.is_authenticated:

                if (
                    day_routine
                    and not request.user.day_products.filter(id=product_id).exists()
                ):
                    request.user.day_products.add(product)
                elif (
                    not day_routine
                    and not request.user.night_products.filter(id=product_id).exists()
                ):
                    request.user.night_products.add(product)
                avoid_ing = request.user.avoid_ingredients
                all_products = (
                    request.user.day_products.all() | request.user.night_products.all()
                )
            else:
                avoid_ing = request.data.get("personalIngredients", [])

            comedogenic_ingredients = handle_ingredients_check(
                product.raw_ingredients, avoid_ing
            )
            analysis = {
                "id": product.id,
                "name": product.name,
                "comedogenic_ingredients": comedogenic_ingredients,
            }

            routine_issues = (
                check_routine_compatibility(all_products)
                if request.user.is_authenticated
                else []
            )

            return Response(
                {"analysis": analysis, "routineIssues": routine_issues},
                status=status.HTTP_200_OK,
            )
    else:
        return Response(
            {"error": "Invalid request method"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


def check_routine_compatibility(products):
    all_ings = set()
    for product in products:
        all_ings.update([ing.lower() for ing in product.raw_ingredients])

    ingredients = Ingredients.objects.filter(name__in=all_ings)
    categories = ["AHA", "BHA", "retinol", "vitamin c", "acne treatment"]
    category_mapping = {category: [] for category in categories}

    present_ings = set()
    for ing in ingredients:
        present_ings.add(ing.name)
        if ing.category in category_mapping:
            category_mapping[ing.category].append(ing.name)

    present_cats = {cat for cat, ings in category_mapping.items() if ings}
    all_present = present_cats.union(present_ings)

    bad_mixes = [
        frozenset(["AHA", "BHA"]),
        frozenset(["AHA", "retinol"]),
        frozenset(["BHA", "retinol"]),
        frozenset(["vitamin c", "retinol"]),
        frozenset(["vitamin c", "AHA"]),
        frozenset(["vitamin c", "BHA"]),
        frozenset(["niacinamide", "vitamin c"]),
    ]

    bad_combos = []

    for mix in bad_mixes:
        if mix.issubset(all_present):
            involved = {}
            for item in mix:
                if item in category_mapping:
                    involved[item] = category_mapping[item]
                elif item in present_ings:
                    involved[item] = [item]
            bad_combos.append(
                {
                    "combination": list(mix),
                    "involved_ingredients": involved,
                }
            )
    product_names = check_compatibility_products(products, bad_combos)
    print(product_names)
    return {"bad_combinations": bad_combos, "products_involved": product_names}


def check_compatibility_products(products, bad_combos):
    product_names = set()
    product_mapping = {
        product.name: {ing.lower() for ing in product.raw_ingredients}
        for product in products
    }

    for combo in bad_combos:
        involved_ings = combo["involved_ingredients"]
        combined_ings = set()
        for ings in involved_ings.values():
            combined_ings.update(ings)

        for product_name, ingredients in product_mapping.items():
            if ingredients.intersection(combined_ings):
                product_names.add(product_name)

    return list(product_names)
