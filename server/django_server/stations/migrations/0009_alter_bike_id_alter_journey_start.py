# Generated by Django 4.0.1 on 2022-01-20 17:36

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('stations', '0008_alter_bike_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bike',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='journey',
            name='start',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
