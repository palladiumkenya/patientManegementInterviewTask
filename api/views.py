from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from data.models import Patient, Kin
from .serializers import PatientSerializer, KinSerializer
from rest_framework import generics


def home(request):
    return render(request, 'api_home.html')

# the API views


class PatientList(generics.ListAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class PatientDetail(generics.RetrieveAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class KinList(generics.ListAPIView):
    queryset = Kin.objects.all()
    serializer_class = KinSerializer


class KinDetail(generics.RetrieveAPIView):
    queryset = Kin.objects.all()
    serializer_class = KinSerializer














    

