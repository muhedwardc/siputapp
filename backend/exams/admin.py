from django.contrib import admin
from .models import Room, Session, Exam, Penguji

admin.site.register(Room)
admin.site.register(Session)

class ExamAdmin(admin.ModelAdmin):
    exclude = ('is_finish',)

admin.site.register(Exam, ExamAdmin)

class PengujiAdmin(admin.ModelAdmin):
    exclude = ('is_attending',)

admin.site.register(Penguji, PengujiAdmin)

