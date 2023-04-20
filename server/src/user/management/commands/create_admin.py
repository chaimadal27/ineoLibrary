from django.core.management.base import BaseCommand, CommandError
from django.db.utils import IntegrityError
from user.models import User


class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        query = User.objects.filter(email='a@a.com')

        if query:
            self.stdout.write("user already exists")
        else:
            admin = User.objects.create_superuser("a@a.com", "a", "a", "a")
            admin.save()
            self.stdout.write("user created successfully")
