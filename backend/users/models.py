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
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, nama, email, nip, password):
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

    # KONSENTRASI_CHOICES = {
    #     ('RPL', 'Rekayasa Perangkat Lunak'),
    #     ('RSI', 'Rekayasa Sistem Informasi'),
    #     ('RSK', 'Rekayasa Sistem Komputer')
    # }


    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True)
    nama = models.CharField(max_length=50, blank=True)
    email = models.EmailField(
        max_length=50, verbose_name='alamat email', unique=True)
    nip = models.CharField(
        max_length=20, verbose_name='Nomor Induk Pegawai', blank=True)
    prodi = models.CharField(max_length=20, choices=PRODI_CHOICES, blank=True, null=True)
    konsentrasi = models.CharField(max_length=50, blank=True, null=True)
    is_admin = models.BooleanField(default=False)
    last_login = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('nama', 'nip')

    def __str__(self):
        return self.nama

    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_active(self):
        return True

    @property
    def is_staff(self):
        return self.is_admin