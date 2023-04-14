from django.db import models
from multiupload.fields import MultiFileField
from django.contrib.postgres.fields import ArrayField
from mixins.behaviors import (
    Timestampable,
    Authorable,
    Sharable
)


class Workshop(Timestampable, Authorable, Sharable):
    USES = [
        ('Business Creation', 'Business Creation'),
        ('Post Creation', 'Post Creation'),
        ('Agriculture Business', 'Agriculture Business'),
        ('Startups', 'Startups'),
        ('Social Business', 'Social Business'),
        ('Green Business', 'Green Business'),
        ('Women Entrepreneurship', 'Women Entrepreneurship')
    ]
    LITERACY = [
        ('Basic', 'Basic'),
        ('Intermidiate', 'Intermidiate'),
        ('Advanced', 'Advanced')
    ]
    SKILLS = [
        ('Computer Skills', 'Computer Skills'),
        ('Numeracy Skills', 'Numeracy Skills')
    ]
    METHOD = (
        ('Online', 'Online'),
        ('Blended', 'Blended'),
        ('Presential', 'Presential')
    )
    workshop_title = models.CharField(max_length=100, null=True)
    uses = models.CharField(max_length=100, choices=USES,
                            default='Post Creation', null=True)
    target_skills = models.CharField(
        max_length=100, choices=SKILLS, default='Computer Skills', null=True)
    duration = models.PositiveIntegerField(null=True)
    workshop_method = models.CharField(
        max_length=100, choices=METHOD, default='Online', null=True)
    workshop_image = models.ImageField(upload_to="workshopimages/", null=True)
    workshop_description = models.TextField(null=True)
    workshop_attachements = models.FileField(
        upload_to="workshopattachements/", null=True)

    class Meta:
        permissions = [
            ('can_share_workshop', 'Can share workshop')
        ]
        get_latest_by = 'created_at'

    def __str__(self):
        return self.worskshop_title
