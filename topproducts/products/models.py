from uuid import uuid4
from django.db import models


class Product(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    productName = models.CharField(max_length=500, null=False, blank=False)
    price = models.FloatField()
    rating = models.FloatField()
    discount = models.FloatField()
    availability = models.CharField(max_length=200)

    company = models.CharField(max_length=200)
    categories = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.productName} | {self.company}"
