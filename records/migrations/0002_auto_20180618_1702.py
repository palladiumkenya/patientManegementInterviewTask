# Generated by Django 2.0.3 on 2018-06-18 14:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='patient',
            options={'ordering': ['first_name']},
        ),
    ]
