# Generated by Django 2.2 on 2019-05-04 07:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0002_auto_20190504_1131'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exam',
            name='status',
            field=models.IntegerField(choices=[(3, 'Selesai'), (1, 'Belum Mulai'), (2, 'Sedang Berlangsung')]),
        ),
    ]