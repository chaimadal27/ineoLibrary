from rest_framework_simplejwt.views import TokenRefreshView

from django.urls import path
from . import views as v

urlpatterns = [
        path('', v.authenticationRoutes),
        path('token/', v.CustomTokenAPI.as_view(), name='token_obtain_pair'),
        path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
        path('signup/', v.signup),
]

