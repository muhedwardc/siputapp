from rest_framework import serializers

from .models import Room, Session, Exam, Penguji
from backend.essays.serializers import SimpleEssaySerializer, EssaySerializer, CreateEssaySerializer
from backend.essays.models import Essay, Student
from backend.users.serializers import SimpleUserSerializer
from backend.users.models import User

class ListRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    total_exam_in_room = serializers.IntegerField(required=False)

    class Meta:
        model = Room
        fields = ('id', 'nama', 'total_exam_in_room')

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('nama', )

class ListSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'

class SessionSerializer(serializers.ModelSerializer):
    total_exam_in_session = serializers.IntegerField(required=False)

    class Meta:
        model = Session
        fields = ('id', 'nama', 'mulai', 'selesai', 'total_exam_in_session')

class CreateSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ('nama', 'mulai', 'selesai')

class ListPengujiSerializer(serializers.ModelSerializer):
    dosen = serializers.StringRelatedField()

    class Meta:
        model = Penguji
        fields = ('dosen',)

class PengujiSerializer(serializers.ModelSerializer):
    dosen = serializers.StringRelatedField()
    
    class Meta:
        model = Penguji
        fields = ('dosen', 'is_leader', 'is_present')

class CreatePengujiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Penguji
        fields = ('dosen', )

        def create(self, validated_data):
            dosen = User.objects.get(pk=validated_data['dosen'])
            penguji = Penguji.objects.create(
                ujian=validated_data['ujian'],
                dosen=dosen
            )

            return penguji

class ListExamSerializer(serializers.ModelSerializer):
    sesi = serializers.StringRelatedField()
    ruang = serializers.StringRelatedField()
    skripsi = SimpleEssaySerializer()
    penguji = PengujiSerializer(many=True, required=False)

    class Meta:
        model = Exam
        fields = ('id', 'status', 'tanggal', 'sesi', 'ruang', 'skripsi', 'penguji')

class ExamSerializer(serializers.ModelSerializer):
    sesi = serializers.StringRelatedField()
    ruang = serializers.StringRelatedField()
    skripsi = EssaySerializer()
    penguji = PengujiSerializer(many=True, required=False)

    class Meta:
        model = Exam
        fields = ('status', 'tanggal', 'sesi', 'ruang', 'skripsi', 'penguji')

class CreateExamSerializer(serializers.ModelSerializer):
    skripsi = CreateEssaySerializer()
    penguji = CreatePengujiSerializer(many=True, required=False)

    class Meta:
        model = Exam
        fields = ('tanggal', 'sesi', 'ruang', 'skripsi', 'penguji')

    def create(self, validated_data):
        skripsi_data = validated_data.pop('skripsi')
        penguji_data = validated_data.pop('penguji')
        mahasiswa_data = skripsi_data.pop('mahasiswa')
        new_skripsi = Essay.objects.create(
            judul=skripsi_data['judul'],
            intisari=skripsi_data['intisari'],
            naskah=skripsi_data['naskah'],
            pembimbing_satu=skripsi_data['pembimbing_satu'],
            pembimbing_dua=skripsi_data['pembimbing_dua'],
            is_capstone=skripsi_data['is_capstone']
        )

        for data in mahasiswa_data:
            mahasiswa = Student.objects.create(skripsi=new_skripsi, **data)

        new_ujian = Exam.objects.create(
            skripsi=new_skripsi,
            tanggal=validated_data['tanggal'],
            sesi=validated_data['sesi'],
            ruang=validated_data['ruang']
        )
        
        Penguji.objects.create(ujian=new_ujian, dosen=new_skripsi.pembimbing_satu, is_leader=True)
        Penguji.objects.create(ujian=new_ujian, dosen=new_skripsi.pembimbing_dua)

        for data in penguji_data:
            Penguji.objects.create(
                ujian=new_ujian,
                dosen=data['dosen']
            )
        
        return new_ujian

class EditExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ('tanggal', 'sesi', 'ruang')

class RecapExamSerializer(serializers.ModelSerializer):
    sesi = serializers.StringRelatedField()
    ruang = serializers.StringRelatedField()
    skripsi = SimpleEssaySerializer()
    ketua = serializers.SerializerMethodField()
    penguji = serializers.SerializerMethodField()

    def get_ketua(self, exam):
        ketua = dict()
        for penguji in exam.penguji.all():
            if penguji.is_leader == True:
                dosen = penguji.dosen
                ketua.update({'id': dosen.pk, 'nama': dosen.nama})
                return ketua
            else:
                return None

    def get_penguji(self, exam):
        list_penguji = list()
        for penguji in exam.penguji.all():
            grades = penguji.grades.all()
            if grades.exists():
                list_penguji.append(penguji)

        return ListPengujiSerializer(list_penguji, many=True).data

    class Meta:
        model = Exam
        fields = ('tanggal', 'sesi', 'ruang', 'skripsi', 'ketua', 'penguji')

class UploadEssaySerializer(serializers.Serializer):
    file = serializers.FileField()





