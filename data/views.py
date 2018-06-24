from django.shortcuts import render, get_object_or_404, render_to_response, reverse
from django.http import HttpResponse
from .models import Patient, Kin
from django.views import generic
from django.core.paginator import Paginator
from django.views.generic import TemplateView, UpdateView, CreateView, DeleteView
from django.core.urlresolvers import reverse_lazy


class Index(TemplateView):
    template_name = 'homepage.html'


def home(request):
    num_patients = Patient.objects.all().count()
    num_kin = Kin.objects.all().count()
    return render(request, 'index.html', context={'num_patients': num_patients, 'num_kin': num_kin})


class PatientListView(generic.ListView):
    model = Patient
    context_object_name = 'patients'
    queryset = Patient.objects.all()  # fetch all the patients in the system
    Paginator = (queryset, 50)  # paginate with 50 items per page
    template_name = 'patient_list.html'


class KinListView(generic.ListView):
    model = Kin
    context_object_name = 'kin'
    queryset = Kin.objects.all()
    template_name = 'kin_list.html'


class PatientDetailView(generic.DetailView):
    model = Patient
    template_name = 'patient.html'


class KinDetailView(generic.DetailView):
    model = Kin
    template_name = 'kin.html'


def under_15(request):
    kids = Patient.objects.filter(age__lte=15)
    kids_count = kids.count()
    return render(request, 'kids.html', {'kids': kids, 'kids_count': kids_count})


class UpdatePatient(UpdateView):
    model = Patient
    fields = ['county', 'sub_county', 'ward', 'village', 'cell_phone', 'email', ]
    template_name = 'update_patient.html'
    success_url = reverse_lazy('data:home')


class UpdateKin(UpdateView):
    model = Kin
    template_name = 'update_kin.html'
    fields = ['first_name', 'last_name', 'id_number', 'cell_phone']
    success_url = reverse_lazy('data:home')


class DeletePatient(DeleteView):
    model = Patient
    template_name = 'patient.html'
    success_url = reverse_lazy('data:home')





















