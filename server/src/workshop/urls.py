from django.urls import path
from . import views as v

urlpatterns = [
    path('list/', v.ListWorkshopAPI.as_view()),
    path('<int:pk>/detail/', v.DetailWorkshopAPI.as_view()),
    path('create/lanes/', v.CreateWorkshopLanesAPI.as_view()),
    path('<int:pk>/update/lanes/', v.UpdateWorkshopLanes.as_view()),
    path('<int:pk>/update/image/', v.UpdateWorkshopImage.as_view()),
    path('<int:pk>/delete/', v.DestroyWorkshopAPI.as_view()),
]
