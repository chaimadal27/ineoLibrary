# Generated by Django 4.1.6 on 2023-04-12 23:10

from django.db import migrations
import django_quill.fields


class Migration(migrations.Migration):

    dependencies = [
        ('activity', '0004_alter_activity_activity_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='activity_title',
            field=django_quill.fields.QuillField(),
        ),
    ]
