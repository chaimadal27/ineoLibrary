from django.db import models
from workshop.models import Workshop


class WorkshopAttachement(models.Model):
    pass
    # attachement = models.ImageField(upload_to='workshopattachments/')
    # workshop = models.ForeignKey(
    #     Workshop, on_delete=models.CASCADE, related_name='attach', null=True)
