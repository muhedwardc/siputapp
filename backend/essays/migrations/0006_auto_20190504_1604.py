# Generated by Django 2.2 on 2019-05-04 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('essays', '0005_auto_20190504_1530'),
    ]

    operations = [
        migrations.AlterField(
            model_name='essay',
            name='naskah',
            field=models.FileField(blank=True, null=True, upload_to='skripsi/%Y/%m/%d/'),
        ),
    ]