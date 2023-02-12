from rest_framework import serializers
from django.contrib.auth.models import Permission
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ['id']
        extra_kwargs={
                'password':{'write_only':True}
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        permission_data = validated_data.pop('user_permissions', None)
        groups_data = validated_data.pop('groups', None)
        instance = self.Meta.model(**validated_data)
        if permission_data:
            permissions = Permission.objects.filter(codename__in = permission_data).all()
            instance.user_permissions.set(permissions)
        if groups_data:
            instance.set_groups(groups_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        permission_data = validated_data.pop('user_permissions', None)
        groups_data = validated_data.pop('groups', None)
        instance = self.Meta.model(**validated_data)
        if permission_data:
            permissions = Permission.objects.filter(codename__in = permission_data).all()
            instance.user_permissions.set(permissions)
        if groups_data:
            instance.set_groups(groups_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
