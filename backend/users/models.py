from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinLengthValidator
from products.models import Products


# Create your models here.
class User(AbstractUser):
    DRY = "Dry"
    NORMAL = "Normal"
    OILY = "Oily"
    ACNE = "Acne"
    SENSITIVE = "Sensitive"
    COMBINATION = "Combination"

    SKIN_TYPE_CHOICES = [
        (DRY, "Dry"),
        (NORMAL, "Normal"),
        (OILY, "Oily"),
        (ACNE, "Acne"),
        (SENSITIVE, "Sensitive"),
        (COMBINATION, "Combination"),
    ]
    username = models.CharField(
        unique=True,
        max_length=20,
        validators=[MinLengthValidator(5)],
        error_messages={
            "unique": "A user with that username already exists",
            "required": "A username is required",
        },
    )
    skin_type = models.CharField(
        max_length=15,
        null=False,
        blank=False,
        choices=SKIN_TYPE_CHOICES,
        error_messages={
            "required": "A skin type is required",
            "invalid_choice": "Please select a valid skin type from the list",
        },
    )
    avoid_ingredients = ArrayField(
        models.CharField(max_length=80), blank=True, null=True
    )
    day_products = models.ManyToManyField(
        Products, related_name="users_with_day_products"
    )
    night_products = models.ManyToManyField(
        Products, related_name="users_with_night_products"
    )
