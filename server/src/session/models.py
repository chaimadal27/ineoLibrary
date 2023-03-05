from django.db import models
from mixins.behaviors import Timestampable, Authorable, Sharable
from workshop.models import Workshop
import uuid

class Session(Authorable, Timestampable, Sharable):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session_title = models.CharField(max_length=100)
    # laneID = models.IntegerField()
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, related_name='lanes', null=True)


    def __str__(self):
        return self.session_title

    class Meta:
        ordering  = ['created_at','updated_at']