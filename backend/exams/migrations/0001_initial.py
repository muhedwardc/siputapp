# Generated by Django 2.2 on 2019-04-05 14:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('essays', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Exam',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tanggal', models.DateField()),
                ('is_finish', models.BooleanField(default=False)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Exam',
                'verbose_name_plural': 'Exams',
                'db_table': 'exams',
            },
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nama', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nama', models.CharField(max_length=20)),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Penguji',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_leader', models.BooleanField(default=False)),
                ('is_attending', models.BooleanField(null=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('dosen', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='exams', to=settings.AUTH_USER_MODEL)),
                ('ujian', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='penguji', to='exams.Exam')),
            ],
            options={
                'verbose_name': 'Penguji',
                'verbose_name_plural': 'Penguji',
            },
        ),
        migrations.AddField(
            model_name='exam',
            name='ruang',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='exams', to='exams.Room'),
        ),
        migrations.AddField(
            model_name='exam',
            name='sesi',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='exams', to='exams.Session'),
        ),
        migrations.AddField(
            model_name='exam',
            name='skripsi',
            field=models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, related_name='exams', to='essays.Essay'),
        ),
    ]
