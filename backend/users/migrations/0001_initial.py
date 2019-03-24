# Generated by Django 2.1.7 on 2019-03-24 11:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('nama', models.CharField(blank=True, max_length=50)),
                ('email', models.EmailField(max_length=50, unique=True, verbose_name='alamat email')),
                ('nip', models.CharField(blank=True, max_length=20, verbose_name='Nomor Induk Pegawai')),
                ('prodi', models.CharField(blank=True, choices=[('TI', 'Teknologi Informasi'), ('TE', 'Teknik Elektro')], max_length=20, null=True)),
                ('konsentrasi', models.CharField(blank=True, choices=[('RPL', 'Rekayasa Perangkat Lunak'), ('RSI', 'Rekayasa Sistem Informasi'), ('RSK', 'Rekayasa Sistem Komputer')], max_length=50, null=True)),
                ('foto', models.ImageField(blank=True, upload_to='profil')),
                ('last_login', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'User',
                'verbose_name_plural': 'Users',
                'db_table': 'users',
            },
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nama', models.CharField(max_length=20)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users', to='users.Role'),
        ),
    ]
