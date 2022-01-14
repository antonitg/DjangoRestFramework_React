from django.db import migrations, models

# class Migration(migrations.Migration):

    # initial = True
    # operations = [
    #     migrations.CreateModel(
    #         name='Station',
    #         fields=[
    #             ('id', models.AutoField(auto_created=True, primary_key=True, verbose_name='ID')),
    #             ('photo', models.TextField(blank=False)),
    #             ('name', models.TextField(blank=False)),
    #             ('location', models.TextField(blank=False)),
    #             ('space', models.IntegerField(blank=False, default=0)),
    #             ('status', models.IntegerField(blank=True, default=1))
    #         ],
    #     ),
    #     migrations.CreateModel(
    #         name='Bike',
    #         fields=[
    #             ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
    #             ('name', models.TextField(blank=True)),
    #             ('status', models.IntegerField(blank=False, default=1)),
    #             ('time', models.IntegerField(blank=True)),
    #             ('station', models.ForeignKey("Station", verbose_name=("ID"), on_delete=models.DO_NOTHING)),

    #         ],
    #     ),
    # ]