from django.db import migrations, models

class Migration(migrations.Migration):

    # initial = True
    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bio', models.TextField(blank=True)),
                ('mail', models.EmailField(blank=True)),
                ('name', models.TextField(blank=True)),
            ],
        ),
    ]