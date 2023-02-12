from django.db import models
from user.models import User


class Timestampable(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        abstract = True

class Authorable(models.Model):
    created_by = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='+')
    updated_by = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='+')
    deleted_by = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='+')

    class Meta:
        abstract = True

class Sharable(models.Model):
    shared_by = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='+')
    shared_with = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='+')
    shared_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        abstract = True