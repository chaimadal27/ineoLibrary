# Generated by Django 4.1.6 on 2023-02-13 02:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workshop', '0018_workshop_workshop_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='workshop',
            name='workshop_image',
        ),
    ]
