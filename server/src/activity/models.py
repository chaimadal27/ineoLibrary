from django.db import models
from django import forms
from multiselectfield import MultiSelectField
from mixins.behaviors import Timestampable, Authorable
from session.models import Session
from django.contrib.postgres.fields import ArrayField
import uuid


class Difficulty(models.Model):
    DIFFUCULTY = (
        ('EASY', 'Easy'),
        ('INTERMIDIATE', 'Intermidiate'),
        ('HARD', 'Hard')
    )
    COLOR = (
        ('ERROR', 'error'),
        ('WARNING', 'warning'),
        ('EASY', 'easy')
    )
    title = models.CharField(
        max_length=100, choices=DIFFUCULTY, default='Easy')
    bgColor = models.CharField(max_length=100, choices=COLOR, default='error')


class Activity(Timestampable, Authorable):

    def validate_technique_list(value):
        valid_techniques = ['Business simulation', 'Role play simulation', 'Role play', 'Idea generation',
                            'Group discussion', 'Team challenge', 'Multimedia, Video', 'Story telling, drawing']
        for item in value:
            if item not in valid_techniques:
                raise ValidationError(
                    'Invalid technique: %(value)s', params={'value': item})

    ACTIVITY_METHOD = (
        ('Presential', 'Presential'),
        ('Online', 'Online'),
        ('Blended', 'Blended')
    )
    DIFFUCULTY = (
        ('Easy', 'Easy'),
        ('Intermidiate', 'Intermidiate'),
        ('Hard', 'Hard')
    )
    TECHNIQUE = (
        ('Business simulation', 'Business simulation'),
        ('Role play simulation', 'Role play simulation'),
        ('Role play', 'Role play'),
        ('Idea generation', 'Idea generation'),
        ('Group discussion', 'Group discussion'),
        ('Team challenge', 'Team challenge'),
        ('Multimedia, Video', 'Multimedia, Video'),
        ('Story telling, drawing', 'Story telling, drawing')
    )
    NEEDS = (
        ('Metaplan cards', 'Metaplan cards'),
        ('Flip cards', 'Flip cards'),
        ('Pinboard', 'Pinboard'),
        ('Special facilitation tool', 'Special facilitation tool')
    )
    # activity_id = models.CharField(max_length=2, null=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    activity_title = models.TextField(null=True)
    activity_method = models.CharField(
        max_length=100, choices=ACTIVITY_METHOD, default='Presential')
    activity_technique = ArrayField(
        models.CharField(max_length=100), blank=True, null=True)
    activity_difficulty = models.JSONField()
    activity_duration = models.PositiveIntegerField()
    activity_objectives = models.TextField(null=True)
    activity_needs = models.TextField(
        max_length=100, choices=NEEDS, default='Metaplan cards')
    activity_organization = models.TextField(null=True)
    activity_variations = models.TextField(null=True)
    activity_description = models.TextField(null=True)

    # activity_attachements = models.FileField(upload_to='workshopfiles', storage=None, max_length=200, null=True)

    session = models.ForeignKey(
        Session, on_delete=models.CASCADE, related_name='cards', null=True)

    def __str__(self):
        return self.activity_title

    class Meta:
        ordering = ['created_at', 'updated_at']


class ActivityTechnique(models.Model):
    pass
