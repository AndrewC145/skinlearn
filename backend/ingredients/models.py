from django.db import models


# Create your models here.
class Ingredients(models.Model):
    name = models.CharField(max_length=80)
    category = models.CharField(max_length=100, blank=True, null=True, default=None)

    def __str__(self):
        return self.name
