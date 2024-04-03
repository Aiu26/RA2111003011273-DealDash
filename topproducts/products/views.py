from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
import requests
import json
from .models import Product
from .serializers import ProductSerializer
import os

base_url = "http://20.244.56.144/test"


@api_view(['GET'])
def products(request, category_name):
    errors = {}
    if 'n' not in request.query_params:
        errors['n'] = 'n is required'
    if 'minPrice' not in request.query_params:
        errors['minPrice'] = 'minPrice is required'
    if 'maxPrice' not in request.query_params:
        errors['maxPrice'] = 'maxPrice is required'
    if 'companyname' not in request.query_params:
        errors['companyname'] = 'companyname is required'
    if errors:
        return Response({'errors': errors}, status=HTTP_400_BAD_REQUEST)

    AUTH_CREDENTIALS = {
        "companyName": os.environ.get("companyName"),
        "clientID": os.environ.get("clientID"),
        "clientSecret": os.environ.get("clientSecret"),
        "ownerName": os.environ.get("ownerName"),
        "ownerEmail": os.environ.get("ownerEmail"),
        "rollNo": os.environ.get("rollNo"),
    }
    auth_response = requests.post(f"{base_url}/auth", json=AUTH_CREDENTIALS)
    access_token = json.loads(auth_response.text)['access_token']

    products_response = requests.get(f"{base_url}/"
                                     f"companies/{request.query_params.get('companyname')}/"
                                     f"categories/{category_name}/"
                                     f"products", params={
        "top": request.query_params.get('n'),
        "minPrice": request.query_params.get('minPrice'),
        "maxPrice": request.query_params.get('maxPrice')
    }, headers={'Authorization': f"Bearer {access_token}"})
    if products_response.status_code != 200:
        return Response({'error': 'Invalid request'}, status=HTTP_400_BAD_REQUEST)

    final_response = []
    for product in json.loads(products_response.text):
        db_product = Product.objects.create(
            productName=product['productName'],
            price=product['price'],
            rating=product['rating'],
            discount=product['discount'],
            availability=product['availability'],
            company=request.query_params.get('companyname'),
            categories=category_name
        )
        final_response.append(ProductSerializer(db_product, many=False).data)

    return Response(final_response, status=HTTP_200_OK)


@api_view(['GET'])
def product(request, category_name, product_id):
    try:
        product = Product.objects.get(id=product_id, categories=category_name)
    except:
        return Response({'error': 'Product not found'}, status=HTTP_400_BAD_REQUEST)

    return Response(ProductSerializer(product, many=False).data, status=HTTP_200_OK)