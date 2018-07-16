from django.db import models
from datetime import date
from .common.utils import ContactType, County, Gender, ActionType

# Create your models here.
class Patient(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=250)
    middle_name = models.CharField(max_length=250, null=True, blank=True)
    last_name = models.CharField(max_length=250)
    gender = models.CharField(max_length=1, choices=Gender.choices())
    dob = models.DateField(blank=False)
    county = models.CharField(max_length=5, choices=County.choices())
    sub_county = models.CharField(max_length=250, null=True)
    ward = models.CharField(max_length=250, null=True)
    village = models.CharField(max_length=250, null=True)
    is_patient = models.BooleanField()
    enrollment_date = models.DateField(null=True, blank=True)
    enrollment_number = models.CharField(max_length=250, unique=True, null=True, blank=True)
    is_nok = models.BooleanField()
    nok = models.ManyToManyField("Patient")
    is_active = models.BooleanField(default=True)
    date_deleted = models.DateTimeField(null = True, blank=True)

    def __str__(self):
        if self.middle_name != '':
            return '{0} {1} {2}'.format(self.first_name,self.middle_name,self.last_name)
        else:
            return '{0} {1}'.format(self.first_name,self.last_name)
    
    def calculate_age(self):
        today = date.today()
        return today.year - self.dob.year - ((today.month, today.day) < (self.dob.month, self.dob.day))
    
    class Meta:
        ordering = ["first_name"]

class Contact(models.Model):
    id = models.AutoField(primary_key=True)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True)
    contact_type = models.CharField(max_length=15, choices=ContactType.choices())
    value = models.CharField(max_length=250)
    is_active = models.BooleanField(default=True)

class AuditLog(models.Model):
    id = models.AutoField(primary_key=True)
    action_type = models.CharField(max_length=1, choices=ActionType.choices())
    narration = models.TextField()
    date_recorded = models.DateTimeField(auto_now_add=True)
