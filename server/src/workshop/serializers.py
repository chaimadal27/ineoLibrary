from rest_framework import serializers
from .models import Workshop
from session.serializers import SessionSerializer
from workshop_attachement.serializers import WorkshopAttachementSerializer
from mixins.serializers import NestedUpdateMixin, NestedCreateMixin
from activity.models import Activity
import datetime


class WorkshopAllSerializer(NestedUpdateMixin, NestedCreateMixin):
    lanes = SessionSerializer(many=True)
    # attach = WorkshopAttachementSerializer(many=True)

    class Meta:
        model = Workshop
        fields = [
            'id',
            'workshop_title',
            'uses',
            'target_skills',
            'duration',
            'workshop_method',
            'workshop_image',
            'workshop_attachements',
            'workshop_description',
            'lanes',
            'created_at',
            'updated_at',
            'deleted_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'deleted_at']
        nested_fields = {
            'lanes': 'workshop'
            # 'attach': 'workshop'
        }


class WorkshopLanesSerializer(NestedCreateMixin, NestedUpdateMixin):
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
            'workshop_description',
            'lanes',
            'created_at',
            'updated_at',
            'deleted_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'deleted_at']
        nested_fields = {'lanes': 'workshop'}


# class WorkshopImageSerializer(serializers.ModelSerializer):
#     workshop_attachements = serializers.ListField(
#         child=serializers.FileField(allow_empty_file=True, use_url=True),
#         allow_null=True,
#         required=False
#     )

#     class Meta:
#         model = Workshop
#         fields = ['id', 'workshop_image', 'workshop_attachements']
#         read_only_fields = ['id']

class WorkshopImageSerializer(serializers.ModelSerializer):
    # workshop_attachements = serializers.ListField(
    #     child=serializers.FileField(), required=True)

    class Meta:
        model = Workshop
        fields = ['id', 'workshop_image', 'workshop_attachements']
        read_only_fields = ['id']

    # def update(self, instance, validated_data):
    #     print(validated_data)
    #     workshop_attachements = validated_data.pop(
    #         'workshop_attachements', None)
    #     if workshop_attachements:
    #         print(workshop_attachements)
    #         instance.workshop_attachements = workshop_attachements
    #     return super().update(instance, validated_data)
