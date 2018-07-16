from django import forms
from django.forms import ModelForm
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
import datetime #for checking renewal date range.

from .models import Patient, Contact

class EnrollPatient(forms.ModelForm):
   
   parent_patient_id = forms.CharField(widget=forms.HiddenInput(), required=False)

   class Meta:
        model = Patient
        fields = ['first_name','middle_name','last_name','gender','dob','county','sub_county','ward','village']
        widgets = {
            'dob': forms.DateInput(attrs={'class': 'datepicker'}),
        }
        labels = { 'first_name': _('First Name'), 'middle_name': _('Middle Name'), 'last_name': _('Last Name'),
                 'gender': _('Gender'), 'dob': _('D.O.B'), 'county': _('County'), 'sub_county': _('Sub County'),
                 'ward': _('Ward'), 'village': _('Village')
                  }

class PatientLocation(forms.ModelForm):
   
   class Meta:
        model = Patient
        fields = ['county','sub_county','ward','village']
        labels = { 'county': _('County'), 'sub_county': _('Sub County'), 
                    'ward': _('Ward'), 'village': _('Village')
                  }


class PatientContact(forms.ModelForm):

    class Meta:
        model = Contact
        fields = ['patient','contact_type','value']
        widgets = {
            'patient': forms.TextInput(attrs={'type': 'hidden'}),
        }

        labels= {'contact_type':_('Contact Type')}