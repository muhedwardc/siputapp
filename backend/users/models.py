from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, nama, email, nip, password=None):
        if not email:
            raise ValueError('Pengguna harus memiliki email!')

        user = self.model(
            nama=nama,
            email=self.normalize_email(email),
            nip=nip
        )
        if password:
            user.set_password(password)

        user.save(using=self._db)
        return user

    def create_superuser(self, nama, email, nip, password=None):
        if not email:
            raise ValueError('Pengguna harus memiliki email!')

        user = self.create_user(
            nama=nama,
            email=email,
            nip=nip,
            password=password
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    PRODI_CHOICES = {
        ('TI', 'Teknologi Informasi'),
        ('TE', 'Teknik Elektro')
    }

    nama = models.CharField(max_length=250, blank=True)
    email = models.EmailField(
        max_length=50, verbose_name='Alamat Email', unique=True)
    nip = models.CharField(
        max_length=20, verbose_name='Nomor Induk Pegawai', blank=True)
    prodi = models.CharField(max_length=20, choices=PRODI_CHOICES, verbose_name='Program Studi', blank=True, null=True)
    konsentrasi = models.CharField(max_length=50, blank=True, null=True)
    foto = models.CharField(max_length=250, null=True, blank=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('nama', 'nip')

    def __str__(self):
        return self.nama

    class Meta:
        db_table = 'users'
        ordering = ['-id']
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

class Pengelola(models.Model):
    jabatan = models.CharField(max_length=250, null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.jabatan
    
    class Meta:
        db_table = 'pengelola'
        verbose_name = 'Pengelola'
        verbose_name_plural = 'Pengelola'