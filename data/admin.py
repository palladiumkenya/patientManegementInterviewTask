from django.contrib import admin
from .models import Patient, Kin


class PatientAdmin(admin.ModelAdmin):
    list_display = ('id_number', 'first_name', 'last_name', 'weight', 'height', 'cell_phone', 'enroll_number')
    fields = ['id_number', 'first_name', 'last_name', 'weight', 'height', 'age', 'county', 'sub_county', 'ward',
              'village', 'cell_phone', 'email', 'alternate_cell', 'enroll_number']
    list_filter = ('first_name', 'last_name', 'cell_phone', 'enroll_number')


admin.site.register(Patient, PatientAdmin)


class KinAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'id_number', 'cell_phone', 'patient')
    fields = ['first_name', 'last_name', 'id_number', 'cell_phone', 'patient']
    list_filter = ('first_name', 'last_name', 'id_number', 'patient')


admin.site.register(Kin, KinAdmin)
