from django.db import models


# Create your models here.
class Ingredients(models.Model):
    name = models.CharField(max_length=80)
    comedogenic_rating = models.IntegerField(null=True, blank=True)

    def get_comedogenic_rating(self):
        if self.comedogenic_rating is None:
            return "Unknown"
        elif self.comedogenic_rating >= 4:
            return "High"
        elif self.comedogenic_rating > 2:
            return "Moderate"
        else:
            return "Low"

    def __str__(self):
        return self.name
