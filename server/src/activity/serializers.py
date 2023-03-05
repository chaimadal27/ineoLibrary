from rest_framework import serializers
from .models import Activity

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = [
            'id',
            'activity_title',
            'activity_method',
            'activity_technique',
            'activity_difficulty',
            'activity_duration',
            'activity_objectives',
            'activity_needs',
            'activity_organization',
            'activity_variations',
            'activity_description',
            #'activity_attachements',
            'session',
            'created_at',
            # 'laneId',
        ]
        read_only_fields = ['id','session','created_at']