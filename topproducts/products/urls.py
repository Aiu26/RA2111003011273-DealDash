from django.urls import path
from .views import products, product

urlpatterns = [
    path('<str:category_name>/products/', products),
    path('<str:category_name>/products/<str:product_id>/', product)
]
