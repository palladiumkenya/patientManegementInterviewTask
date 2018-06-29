from .views import PatientRudView, PatientListView, AuditLogListView, ContactRudView, ContactListView
from django.urls import path

urlpatterns = [
    path('patients/', PatientListView.as_view(), name='patient-list'),
    path('<int:id>/patients/', PatientRudView.as_view(), name="patient-rud"),
    path('contacts/', ContactListView.as_view(), name='contact-list'),
    path('<int:id>/contacts/', ContactRudView.as_view(), name="contact-rud"),
    path('audits/', AuditLogListView.as_view(), name='audit-list')
]