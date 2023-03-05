from django.urls import path
from . import views as v

urlpatterns = [
    path('', v.ListCreateWorkshopAPI.as_view(), name='workshop-list-create'),
    path('<int:pk>/', v.RetrieveUpdateDestroyWorkshopAPI.as_view(), name='workshop-retrieve-update-destory'),
    path('<int:pk>/hard/delete/', v.DestoryWorkshopAPI.as_view(), name='workshop-destroy'),
]