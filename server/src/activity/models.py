from django.db import models
from multiselectfield import MultiSelectField
from mixins.behaviors import Timestampable, Authorable
from session.models import Session

import uuid



class Difficulty(models.Model):
    DIFFUCULTY = (
        ('EASY','Easy'),
        ('INTERMIDIATE','Intermidiate'),
        ('HARD','Hard')
    )
    COLOR = (
        ('ERROR','error'),
        ('WARNING','warning'),
        ('EASY','easy')
    )
    title = models.CharField(max_length=100, choices=DIFFUCULTY, default='Easy')
    bgColor = models.CharField(max_length=100, choices=COLOR, default='error')

class Activity(Timestampable, Authorable):

    ACTIVITY_METHOD = (
        ('Presential','Presential'),
        ('Online','Online'),
        ('Blended','Blended')
    )
    DIFFUCULTY = (
        ('Easy','Easy'),
        ('Intermidiate','Intermidiate'),
        ('Hard','Hard')
    )
    TECHNIQUE = (
        ('Business simulation','Business simulation'),
        ('Role play simulation','Role play simulation'),
        ('Role play','Role play'),
        ('Idea generation','Idea generation'),
        ('Group discussion','Group discussion'),
        ('Team challenge','Team challenge'),
        ('Multimedia, Video','Multimedia, Video'),
        ('Story telling, drawing','Story telling, drawing')
    )
    NEEDS = (
        ('Metaplan cards','Metaplan cards'),
        ('Flip cards','Flip cards'),
        ('Pinboard','Pinboard'),
        ('Special facilitation tool','Special facilitation tool')
    )
    # activity_id = models.CharField(max_length=2, null=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    activity_title = models.CharField(max_length=100)
    activity_method = models.CharField(max_length=100, choices=ACTIVITY_METHOD, default='Presential')
    activity_technique = models.CharField(max_length=100, choices=TECHNIQUE, default='Business simulation', null=True)
    # activity_difficulty = models.ForeignKey(Difficulty, on_delete=models.CASCADE)
    activity_difficulty = models.JSONField()
    activity_duration = models.PositiveIntegerField()
    activity_objectives = models.CharField(max_length=100)
    activity_needs = models.TextField(max_length=100, choices=NEEDS, default='Metaplan cards')
    activity_organization = models.CharField(max_length=100)
    activity_variations = models.CharField(max_length=100)
    activity_description = models.CharField(max_length=200, null=True)
    #activity_attachements = models.FileField(upload_to='workshopfiles', storage=None, max_length=200, null=True)
    
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name='cards', null=True)


    def __str__(self):
        return self.activity_title


    class Meta:
        ordering = ['created_at','updated_at']



