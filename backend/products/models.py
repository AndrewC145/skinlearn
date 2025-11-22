from django.db import models
from ingredients.models import Ingredients
from users.models import User


# Create your models here.
class Products(models.Model):
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=255, null=True, blank=True)
    category = models.CharField(max_length=50, null=False, blank=False)
    ingredients = models.ManyToManyField(Ingredients)
    user_added = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    created_by = models.ForeignKey(
        User, null=True, blank=False, on_delete=models.SET_NULL
    )
    created_at = models.DateTimeField(auto_now_add=True)
