from .views import check_ingredients, get_all_ingredients
from django.urls import path
from products.views import (
    submit_product,
    superuser_dashboard,
    product_submission_delete,
)

urlpatterns = [
    path("analyze/", check_ingredients, name="analyze_ingredients"),
    path("", get_all_ingredients, name="get_ingredients"),
    path("submit/", submit_product, name="submit_products"),
    path("dashboard/", superuser_dashboard, name="superuser_dashboard"),
    path(
        "dashboard/delete/<int:pk>/",
        product_submission_delete,
        name="superuser_dashboard_delete",
    ),
]
