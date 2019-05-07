# Generated by Django 2.2 on 2019-05-04 04:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='last_login',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='prodi',
            field=models.CharField(blank=True, choices=[('TE', 'Teknik Elektro'), ('TI', 'Teknologi Informasi')], max_length=20, null=True),
        ),
    ]
