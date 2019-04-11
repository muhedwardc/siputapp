from django.test import TestCase
from .models import User, Role

class ModelTestCase(TestCase):

    def setUp(self):
        role_data = {
            'nama': 'Akademik'
        }
        
        user_data = {
            'email': 'user.gmail',
            'role': 1, # Role sebagai akademik
            'password': 'Passw0rd'
        }

        self.role = Role(nama=role_data['nama'])

        self.user = User(email=user_data['email'])
        self.user.set_password(user_data['password'])
        
    def test_model_can_create_a_role(self):
        old_count = Role.objects.count()
        self.role.save()
        new_count = Role.objects.count()
        self.assertNotEqual(old_count, new_count)

    def test_model_can_create_a_user(self):
        # Menghitung apakah jumlah user lama berbeda dengan jumlah user baru
        self.role.save()
        old_count = User.objects.count() # Jumlah user sebelum user baru dibuat
        self.user.role = Role.objects.get(nama=self.role.nama)
        self.user.save() # Menyimpan user baru
        new_count = User.objects.count() # Jumlah user setelah user baru disimpan
        self.assertNotEqual(old_count, new_count) # Jika berbeda maka test lolos, artinya user baru berhasil ditambahkan