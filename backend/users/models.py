from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class Role(models.Model):
    nama = models.CharField(max_length=20)

    def __str__(self):
        return self.nama


class UserManager(BaseUserManager):
    def create_user(self, email, role, password=None):
        if not email:
            raise ValueError('Pengguna harus memiliki email!')

        user = self.model(
            email=self.normalize_email(email),
            role=Role.objects.get(pk=role)
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        if not email:
            raise ValueError('Pengguna harus memiliki email!')

        user = self.create_user(
            email=email,
            role=1,
            password=password
        )

        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    PRODI_CHOICES = {
        ('TI', 'Teknologi Informasi'),
        ('TE', 'Teknik Elektro')
    }

    KONSENTRASI_CHOICES = {
        ('RPL', 'Rekayasa Perangkat Lunak'),
        ('RSI', 'Rekayasa Sistem Informasi'),
        ('RSK', 'Rekayasa Sistem Komputer')
    }


    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True)
    nama = models.CharField(max_length=50, blank=True)
    email = models.EmailField(
        max_length=50, verbose_name='alamat email', unique=True)
    nip = models.CharField(
        max_length=20, verbose_name='Nomor Induk Pegawai', blank=True)
    prodi = models.CharField(max_length=20, choices=PRODI_CHOICES, blank=True, null=True)
    konsentrasi = models.CharField(max_length=50, choices=KONSENTRASI_CHOICES, blank=True, null=True)
    foto = models.ImageField(upload_to='profil', blank=True)
    role = models.ForeignKey(Role, related_name='users',
                             on_delete=models.CASCADE)
    last_login = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'

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
        if self.role.pk == 1:
            return True
        return False

    @property
    def is_superuser(self):
        if self.role.pk == 1:
            return True
        return False
