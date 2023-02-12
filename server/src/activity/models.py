from django.db import models
from mixins.behaviors import Timestampable, Authorable
from workshop.models import Workshop


class Activity(Timestampable, Authorable):
    activity_title = models.CharField(max_length=100)
    activity_method = models.CharField(max_length=100)
    activity_technique = models.CharField(max_length=100)
    activity_difficulty = models.CharField(max_length=100)
    activity_duration = models.PositiveIntegerField()
    activity_objectives = models.CharField(max_length=100)
    activity_needs = models.TextField(max_length=100)
    activity_organization = models.CharField(max_length=100)
    activity_variations = models.CharField(max_length=100)
    #activity_attachements = models.FileField(upload_to='workshopfiles', storage=None, max_length=200, null=True)
    day_index = models.SmallIntegerField(null=True)

    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, related_name='activities_set')


    def __str__(self):
        return self.activity_title


    class Meta:
        get_latest_by = 'created_at'