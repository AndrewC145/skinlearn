from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField


# Create your models here.
class User(AbstractUser):
    DRY = "Dry"
    NORMAL = "Normal"
    OILY = "Oily"
    SENSITIVE = "Sensitive"
    COMBINATION = "Combination"

    SKIN_TYPE_CHOICES = [
        (DRY, "Dry"),
        (NORMAL, "Normal"),
        (OILY, "Oily"),
        (SENSITIVE, "Sensitive"),
        (COMBINATION, "Combination"),
    ]

    skin_type = models.CharField(
        max_length=15, null=False, blank=False, choices=SKIN_TYPE_CHOICES
    )
    avoid_ingredients = ArrayField(
        models.CharField(max_length=80), blank=True, null=True
    )
