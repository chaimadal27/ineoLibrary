# Generated by Django 4.1.6 on 2023-02-28 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activity', '0018_alter_activity_activity_method_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='activity_difficulty',
            field=models.CharField(choices=[('EASY', 'Easy'), ('INTERMIDIATE', 'Intermidiate'), ('HARD', 'Hard')], default='Easy', max_length=100),
        ),
        migrations.AlterField(
            model_name='activity',
            name='activity_technique',
            field=models.CharField(max_length=100),
        ),
    ]
