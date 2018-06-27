from django.forms import ModelForm, forms
from .models import Patient


class PatientForm(ModelForm):
    """this form will allow updating of location and """
    class Meta:
        model = Patient
        fields = ['county', 'sub_county', 'ward', 'village', 'cell_phone', 'email', 'enroll_number']

