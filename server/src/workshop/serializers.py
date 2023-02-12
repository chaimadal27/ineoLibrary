from rest_framework import serializers
from .models import Workshop
from activity.serializers import ActivitySerializer
from mixins.serializers import NestedUpdateMixin, NestedCreateMixin
from activity.models import Activity
import datetime

# class WorkshopSerializer(NestedUpdateMixin, NestedCreateMixin):
#     activities_set = ActivitySerializer(many=True)
#     class Meta:
#         model = Workshop
#         fields = [
#             'id',
#             'workshop_title',
#             'uses',
#             'target_skills',
#             'duration',
#             'workshop_method',
#             #'workshop_image',
#             'workshop_description',
#             'activities_set',
#             'workshop_image',
#             'created_at'
#         ]
#         read_only_fields = ['id','created_at']
#         nested_fields = {'activities_set': 'workshop'}

class WorkshopSerializer(serializers.ModelSerializer):
    #activities_set = ActivitySerializer(many=True)
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
            'workshop_image',
            #'activities_set'
        ]
        read_only_fields = ['id']
    
    # def create(self, validated_data):
    #     activities_set = validated_data.pop('activities_set')
    #     validated_data['created_by'] = self.context.get('request').user
    #     instance = Workshop.objects.create(**validated_data)
    #     for activity in activities_set:
    #         Activity.objects.create(workshop=instance, **activity)
    #     return instance

    # def update(self, instance, validated_data):
    #     activities_set = validated_data.pop('activities_set')
    #     # TODO: validate if duplicated
    #     # self.validate_data(activities_set)
    #     validated_data['updated_at'] = datetime.datetime.now()
    #     validated_data['updated_by'] = self.context.get('request').user
    #     instance = super().update(instance, validated_data)
    #     # TODO: update activities
    #     return instance

    # def validate_data(self, activities_set):
    #     pass
