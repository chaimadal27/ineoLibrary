from rest_framework import serializers
from .models import Workshop
from session.serializers import SessionSerializer
from mixins.serializers import NestedUpdateMixin, NestedCreateMixin
from activity.models import Activity
import datetime

class WorkshopSerializer(NestedUpdateMixin, NestedCreateMixin):
    lanes = SessionSerializer(many=True)
    class Meta:
        model = Workshop
        fields = [
            'id',
            'workshop_title',
            'uses',
            'target_skills',
            'duration',
            'workshop_method',
            #'workshop_image',
            'workshop_description',
            'lanes',
            'created_at',
            'updated_at',
            'deleted_at',
        ]
        read_only_fields = ['id','created_at','updated_at','deleted_at']
        nested_fields = {'lanes': 'workshop'}