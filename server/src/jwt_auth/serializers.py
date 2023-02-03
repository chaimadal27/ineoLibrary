from rest_framework import serializers
from users.models import User
from django.contrib.auth.models import Permission

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ['id']
        # this to hide the password from the response
        extra_kwargs = {
            'password':{'write_only':True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # because direct assignment to forward many to many is not allowed
        permission_data = validated_data.pop('user_permissions', None)
        group_data = validated_data.pop('groups', None)
        instance = self.Meta.model(**validated_data)
        # setting the permissions and groups via the serializer
        if permission_data:
            permissions = Permission.objects.filter(
                    codename__in = permission_data).all()
            instance.user_permissions.set(permissions)

        if group_data:
            instance.set_groups(group_data)

        # to hash the password
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
