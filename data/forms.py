from django.forms import ModelForm, forms
from .models import Patient


class PatientForm(ModelForm):
    class Meta:
        model = Patient
        fields = ['']

