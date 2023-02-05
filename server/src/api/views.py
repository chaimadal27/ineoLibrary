from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework import permissions, authentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from user.serializers import UserSerializer
from user.models import User

class CustomTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        return token

class CustomTokenAPI(TokenObtainPairView):
    serializer_class = CustomTokenSerializer

@permission_classes([permissions.IsAdminUser, permissions.IsAuthenticated, permissions.IsAuthenticatedOrReadOnly])
@api_view(http_method_names=['GET'])
def authenticationRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/signup'
    ]
    return Response(routes)

def get_tokens_for_user(user):
    ref = RefreshToken.for_user(user)
    refresh = str(ref)
    access = str(ref.access_token)
    return {
        'refresh': refresh,
        'access': access
    }

@api_view(http_method_names=['POST'])
@permission_classes([permissions.AllowAny])
@authentication_classes([authentication.SessionAuthentication, authentication.BasicAuthentication])
def signup(request:Request):
    data = request.data
    print(data)
    user = User.objects.filter(email=data['email']).first()
    if user is None:
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save(is_active=True)
            return Response({'msg':'success'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_200_OK)
