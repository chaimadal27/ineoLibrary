from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework import permissions
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime

from users.models import User
from .serializers import UserSerializer

def generate_token():
    pass


@api_view(http_method_names=['POST','GET'])
def register(request:Request):
    if request.method == "GET":
        user = User.objects.all()
        serializer = UserSerializer(instance=user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == "POST":
        serializer = UserSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(http_method_names=['POST'])
def login(request:Request):
    email = request.data['email']
    password = request.data['password']
    user = User.objects.filter(email=email).first()
    if user is None:
        raise AuthenticationFailed('User does not exist!!')
    if not user.check_password(password):
        raise AuthenticationFailed('Incorrect password!!')
    payload = {
        'id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=1),
        'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, 'secret', algorithm='HS256')
    response = Response(status=status.HTTP_202_ACCEPTED)
    response.set_cookie(key='jwt', value=token, httponly=True)
    return response

@api_view(http_method_names=['GET'])
def logout(request:Request):
    response = Response(status=status.HTTP_202_ACCEPTED)
    response.delete_cookie('jwt')
    return response
