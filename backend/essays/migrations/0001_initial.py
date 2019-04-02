# Generated by Django 2.1.7 on 2019-04-02 14:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bab', models.CharField(max_length=30)),
                ('halaman', models.IntegerField()),
                ('komentar', models.TextField()),
                ('dosen', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='comments', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Essay',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('judul', models.CharField(max_length=250)),
                ('intisari', models.TextField()),
                ('naskah', models.FileField(blank=True, upload_to='skripsi')),
                ('is_capstone', models.BooleanField()),
                ('pembimbing1', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='pembimbing1', to=settings.AUTH_USER_MODEL)),
                ('pembimbing2', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='pembimbing2', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Essay',
                'verbose_name_plural': 'Essays',
                'db_table': 'essays',
            },
        ),
        migrations.CreateModel(
            name='Grade',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('so1', models.IntegerField()),
                ('so2', models.IntegerField()),
                ('so3', models.IntegerField()),
                ('so4', models.IntegerField()),
                ('so5', models.IntegerField()),
                ('so6', models.IntegerField()),
                ('dosen', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='grades', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nama', models.CharField(max_length=250)),
                ('nim', models.CharField(max_length=30, verbose_name='Nomor Induk Mahasiswa')),
                ('prodi', models.CharField(max_length=20, verbose_name='Program Studi')),
                ('konsentrasi', models.CharField(max_length=50)),
                ('tempat_lahir', models.CharField(max_length=50, verbose_name='Tempat Lahir')),
                ('tanggal_lahir', models.DateField(verbose_name='Tanggal Lahir')),
                ('telepon', models.CharField(max_length=20)),
                ('skripsi', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='students', to='essays.Essay')),
            ],
            options={
                'verbose_name': 'Student',
                'verbose_name_plural': 'Students',
                'db_table': 'students',
            },
        ),
        migrations.CreateModel(
            name='Subtitle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nama', models.CharField(max_length=250)),
                ('mahasiswa', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='subtitles', to='essays.Student')),
                ('skripsi', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subtitles', to='essays.Essay')),
            ],
        ),
        migrations.AddField(
            model_name='grade',
            name='mahasiswa',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='grades', to='essays.Student'),
        ),
        migrations.AddField(
            model_name='comment',
            name='skripsi',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='essays.Essay'),
        ),
    ]
