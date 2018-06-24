from django.conf.urls import url
from django.contrib import admin
from . import views
from .views import PatientDetailView, PatientListView, UpdatePatient, UpdateKin
from django.views.generic import UpdateView, DeleteView


urlpatterns = [
    url(r'^$', views.home, name='home'),
    # the patient urls
    url(r'^patients/', views.PatientListView.as_view(), name='PatientListView'),
    url(r'^patient/(?P<pk>\d+)/$', PatientDetailView.as_view(), name='PatientDetailView'),
    url(r'^edit/(?P<pk>d+)/$', views.UpdatePatient.as_view(), name='update_patient'),

    # the kin urls
    url(r'^kin/', views.KinListView.as_view(), name='KinListView'),
    url(r'^kin/(?P<pk>\d+)/$', views.KinDetailView.as_view(), name='KinDetailView'),

    # children aged 15 or below url
    url(r'^kids', views.under_15, name='kids'),



]


