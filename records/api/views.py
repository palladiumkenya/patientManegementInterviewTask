from rest_framework import generics
from records.models import Patient, Contact, AuditLog
from .serializer import PatientSerializer, ContactSerializer, AuditSerializer

class PatientRudView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    serializer_class = PatientSerializer

    #Create audit log
    AuditLog.objects.create(
        action_type = "P",
        narration = "API was accessed"
    )

    def get_queryset(self):
    	return Patient.objects.all()

class PatientListView(generics.ListAPIView):
    serializer_class = PatientSerializer


    def get_queryset(self):
    	return Patient.objects.all()

class ContactRudView(generics.RetrieveAPIView):
    lookup_field = 'id'
    serializer_class = PatientSerializer


    def get_queryset(self):
        return Contact.objects.all()

class ContactListView(generics.ListAPIView):
    serializer_class = ContactSerializer

    def get_queryset(self):
        return Contact.objects.all()

class AuditLogListView(generics.ListAPIView):
    serializer_class = AuditSerializer

    def get_queryset(self):
        return AuditLog.objects.all()