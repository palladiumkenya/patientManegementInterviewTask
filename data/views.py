from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import Patient, Kin
from django.views import generic


def home(request):
    return render(request, 'index.html')







