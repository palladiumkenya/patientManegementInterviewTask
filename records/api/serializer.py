from rest_framework import serializers
from records.models import Patient, Contact, AuditLog

"""
The serializer converts data objects to JSON as well as performs validations for data passed
"""
class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = [
            'id',
            'first_name',
            'middle_name',
            'last_name',
            'gender',
            'dob',
            'county',
            'sub_county',
            'ward',
            'village',
            'is_patient',
            'enrollment_date',
            'enrollment_number',
            'is_nok',
            'nok',
            'is_active',
            'date_deleted',
        ]

class ContactSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Contact
        fields = [
            'id',
            'patient',
            'contact_type',
            'value',
            'is_active',
        ]

class AuditSerializer(serializers.ModelSerializer):

    class Meta:
        model = AuditLog
        fields = [
            'id',
            'action_type',
            'narration',
            'date_recorded',
        ]
        