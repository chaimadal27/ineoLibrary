# Generated by Django 4.1.6 on 2023-02-12 01:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workshop', '0010_alter_workshop_options'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='workshop',
            name='workshop_image',
        ),
    ]
