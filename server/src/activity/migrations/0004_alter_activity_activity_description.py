# Generated by Django 4.1.6 on 2023-04-12 23:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activity', '0003_alter_activity_activity_objectives'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='activity_description',
            field=models.TextField(null=True),
        ),
    ]