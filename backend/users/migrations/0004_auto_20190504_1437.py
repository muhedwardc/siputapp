# Generated by Django 2.2 on 2019-05-04 07:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20190504_1422'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='prodi',
            field=models.CharField(blank=True, choices=[('TE', 'Teknik Elektro'), ('TI', 'Teknologi Informasi')], max_length=20, null=True),
        ),
    ]
