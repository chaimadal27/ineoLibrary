from rest_framework import serializers
from mixins.serializers import NestedUpdateMixin, NestedCreateMixin
from activity.serializers import ActivitySerializer
from .models import Session

class SessionSerializer(NestedCreateMixin, NestedUpdateMixin):
    cards = ActivitySerializer(many=True)
    class Meta:
        model = Session
        fields = [
            'id',
            'session_title',
            # 'laneID',
            'workshop',
            'cards'
        ]
        read_only_fields = ['id','workshop']
        nested_fields = {'cards':'session'}