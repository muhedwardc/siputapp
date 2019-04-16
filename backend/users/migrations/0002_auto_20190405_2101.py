# Generated by Django 2.2 on 2019-04-05 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='konsentrasi',
            field=models.CharField(blank=True, choices=[('RSK', 'Rekayasa Sistem Komputer'), ('RSI', 'Rekayasa Sistem Informasi'), ('RPL', 'Rekayasa Perangkat Lunak')], max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='prodi',
            field=models.CharField(blank=True, choices=[('TE', 'Teknik Elektro'), ('TI', 'Teknologi Informasi')], max_length=20, null=True),
        ),
    ]