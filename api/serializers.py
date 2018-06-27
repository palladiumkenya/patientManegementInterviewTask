from rest_framework import serializers
from data.models import Patient, Kin


class PatientSerializer(serializers.ModelSerializer):
    """to serialize the Patient model to JSON"""
    class Meta:
        model = Patient
        fields = '__all__'  # display all the fields in the model


class KinSerializer(serializers.ModelSerializer):
    """serialize the Kin model"""
    class Meta:
        model = Kin
        fields = '__all__'


