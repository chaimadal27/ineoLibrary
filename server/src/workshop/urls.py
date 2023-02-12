from django.urls import path
from . import views as v

urlpatterns = [
    path('', v.ListCreateWorkshop.as_view(), name='workshop-list-create'),
    path('<int:pk>/', v.RetrieveUpdateDestroyWorkshop.as_view(), name='workshop-retrieve-update-destory'),
]