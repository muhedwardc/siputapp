# Generated by Django 2.2 on 2019-05-04 08:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20190504_1437'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='prodi',
            field=models.CharField(blank=True, choices=[('TI', 'Teknologi Informasi'), ('TE', 'Teknik Elektro')], max_length=20, null=True),
        ),
    ]
