# Generated by Django 4.1.6 on 2023-02-11 22:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workshop', '0009_workshop_workshop_image'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='workshop',
            options={'get_latest_by': 'created_at', 'permissions': [('can_share_workshop', 'Can share workshop')]},
        ),
    ]
