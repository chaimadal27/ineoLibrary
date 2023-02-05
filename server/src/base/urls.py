from rest_framework import permissions
from django.contrib import admin
from django.urls import path, include, re_path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
      openapi.Info(
         title="Facilitation Library API",
         default_version='v1',
         description="Facilitation Library API dev 0.0",
         terms_of_service="https://www.google.com/policies/terms/",
         contact=openapi.Contact(email="daldoulchaima90@gmail.com"),
         license=openapi.License(name="Custom License"),
      ),
      public=True,
      permission_classes=(permissions.AllowAny,),
   )

urlpatterns = [
    # swagger api documentation
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('api/', include('api.urls')),
]
