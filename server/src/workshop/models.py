from django.db import models
from user.models import (
    Timestampable,
    Authorable,
    Sharable
)

class Workshop(Timestampable, Authorable, Sharable):
    USES = (
        ('BUSINESS_CREATION','Business Creation'),
        ('POST_CREATION', 'Post Creation'),
        ('AGRICULTURE_BUSINESS','Agriculture Business'),
        ('STARTUPS','Startups'),
        ('SOCIAL_BUSINESS','Social Business'),
        ('GREEN_BUSINESS','Green Business'),
        ('WOMEN_ENTREPRENEURSHIP', 'Women Entrepreneurship')
    )
    SKILLS = [
        ('COMPUTER_SKILLS', 'Computer Skills'),
        ('NUMERACY_SKILLS','Numeracy Skills'),
    ]
    METHOD = (
        ('ONLINE','Online'),
        ('BLENDED','Blended'),
        ('PRESENTIAL', 'Presential')
    )
    workshop_title = models.CharField(max_length=100)
    uses = models.CharField(max_length=100, choices=USES, default='Post Creation')
    target_skills = models.CharField(max_length=100, choices=SKILLS, default='Computer Skills')
    duration = models.IntegerField()
    workshop_method = models.CharField(max_length=100, choices=METHOD, default='Online')

    def __str__(self):
        return self.worskshop_title
