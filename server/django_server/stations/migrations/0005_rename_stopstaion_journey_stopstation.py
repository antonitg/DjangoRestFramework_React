# Generated by Django 4.0.1 on 2022-01-20 10:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stations', '0004_journey'),
    ]

    operations = [
        migrations.RenameField(
            model_name='journey',
            old_name='stopStaion',
            new_name='stopStation',
        ),
    ]
