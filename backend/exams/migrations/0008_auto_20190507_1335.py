# Generated by Django 2.2 on 2019-05-07 06:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0007_auto_20190504_1604'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exam',
            name='skripsi',
            field=models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, related_name='exams', to='essays.Essay'),
        ),
        migrations.AlterField(
            model_name='exam',
            name='status',
            field=models.IntegerField(blank=True, choices=[(2, 'Sedang Berlangsung'), (1, 'Belum Mulai'), (3, 'Selesai')], default=1, null=True),
        ),
        migrations.AlterField(
            model_name='room',
            name='nama',
            field=models.CharField(max_length=50),
        ),
    ]
