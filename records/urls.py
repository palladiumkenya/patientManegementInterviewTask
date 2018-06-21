from django.urls import path
from . import views

#routing list for our parking application
urlpatterns = [
    path('', views.HomepageView.as_view(), name='index'),
    path('patients/', views.PatientListView.as_view(), name='patients'),
    path('patients/create', views.PatientCreate.as_view(), name='patient_create'),
    path('patients/<int:pk>/update/', views.PatientUpdate.as_view(), name='patient_update'),
    path('patients/<int:pk>/location/', views.PatientLocationUpdate.as_view(), name='patient_location_update'),
    path('patients/<int:pk>/delete', views.PatientDelete.as_view(), name='patient_delete'),
    path('patients/deleted', views.PatientDeletedListView.as_view(), name='patient_deleted_list'),

    path('contacts/', views.PatientListView.as_view()),
    path('contacts/<int:pk>/patient', views.PatientContactListView.as_view(), name='contacts'),
    path('contacts/<int:patient>/create', views.ContactCreate.as_view(), name='contact_create'),
    path('contacts/<int:pk>/delete', views.ContactDelete.as_view(), name='contact_delete'),

    path('nok/', views.PatientListView.as_view()),
    path('nok/<int:patient>/patient', views.PatientNokListView.as_view(), name='nok'),
    path('nok/<int:patient>/create', views.PatientNokCreate.as_view(), name='nok_create'),
    path('nok/<int:patient>/<int:pk>/update/', views.PatientNokUpdate.as_view(), name='nok_update'),
    path('nok/<int:patient>/<int:pk>/location/', views.PatientLocationUpdate.as_view(), name='patient_location_update'),
    path('nok/<int:pk>/enroll', views.PatientNokEnroll.as_view(), name='nok_enroll'),
    path('nok/<int:pk>/delete', views.PatientNokDelete.as_view(), name='nok_delete'),

    path('audit', views.AuditLogListView.as_view(), name='audits')
]
