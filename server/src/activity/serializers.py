from rest_framework import serializers
from .models import Activity

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = [
            'activity_title',
            'activity_method',
            'activity_technique',
            'activity_difficulty',
            'activity_duration',
            'activity_objectives',
            'activity_needs',
            'activity_organization',
            'activity_variations',
            'activity_attachements',
            'workshop',
            'created_at',
            'day_index',
        ]
        read_only_fields = ['id','workshop','created_at']