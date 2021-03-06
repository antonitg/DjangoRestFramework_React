# Generated by Django 4.0.1 on 2022-05-12 19:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('stations', '0011_alter_bike_time'),
    ]

    operations = [
        migrations.CreateModel(
            name='Incidence',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('status', models.IntegerField(blank=True, default=1)),
                ('info', models.TextField(blank=True)),
                ('response', models.TextField(blank=True)),
                ('journey', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='stations.journey')),
            ],
            options={
                'ordering': ['-created_at', '-updated_at'],
                'abstract': False,
            },
        ),
    ]
