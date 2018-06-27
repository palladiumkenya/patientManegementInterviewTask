from django.conf.urls import url, include
from django.shortcuts import render
from . import views
# from rest_framework import routers


# router = routers.DefaultRouter()   # create an instance of the router
# router.register('patients', views.PatientList)
# router.register('kin', views.KinList)

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^patients/', views.PatientList.as_view()),   # to list patients
    url(r'^patients/<int:pk>/', views.PatientDetail.as_view()),   # to show detailed patient view
    url(r'^kin/', views.KinList.as_view()),  # to list the kin folk
    url(r'^kin/<int:pk>/', views.KinDetail.as_view()),  # to show detailed kin information

]

