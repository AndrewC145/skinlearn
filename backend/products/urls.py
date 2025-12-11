from django.urls import path
from products.views import (
    list_products,
    get_product,
    superuser_dashboard,
    product_submission_delete,
    submit_product,
    save_and_analyze_product,
)

urlpatterns = [
    path("", list_products, name="list_products"),
    path("<int:pk>/", get_product, name="get_product"),
    path("submit/", submit_product, name="submit_products"),
    path("dashboard/", superuser_dashboard, name="superuser_dashboard"),
    path(
        "dashboard/delete/<int:pk>/",
        product_submission_delete,
        name="superuser_dashboard_delete",
    ),
    path("save/", save_and_analyze_product, name="save_product"),
]
