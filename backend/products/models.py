from django.db import models
from ingredients.models import Ingredients
from users.models import User
from cloudinary.models import CloudinaryField


# Create your models here.
class Products(models.Model):
    CLEANSER = "Cleanser"
    TONER = "Toner"
    SERUM = "Serum"
    MOISTURIZER = "Moisturizer"
    SUNSCREEN = "Sunscreen"
    OTHER = "Other"

    PRODUCT_CHOICES = [
        (CLEANSER, "Cleanser"),
        (TONER, "Toner"),
        (SERUM, "Serum"),
        (MOISTURIZER, "Moisturizer"),
        (SUNSCREEN, "Sunscreen"),
        (OTHER, "Other"),
    ]

    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=255, null=True, blank=False)
    category = models.CharField(
        max_length=50, null=False, blank=False, choices=PRODUCT_CHOICES
    )
    ingredients = models.ManyToManyField(Ingredients)
    user_added = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    created_by = models.ForeignKey(
        User, null=True, blank=False, on_delete=models.SET_NULL
    )
    created_at = models.DateTimeField(auto_now_add=True)
    image = CloudinaryField("image", null=True, blank=True)


class ProductSubmission(models.Model):
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=255, null=True, blank=False)
    ingredients = models.ManyToManyField(Ingredients)
    created_by = models.ForeignKey(
        User, null=True, blank=False, on_delete=models.SET_NULL
    )
