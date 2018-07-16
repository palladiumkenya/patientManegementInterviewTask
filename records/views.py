import operator
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.views import generic
from django.views.generic.edit import CreateView, UpdateView, DeleteView, FormView
from django.urls import reverse
from django.urls import reverse_lazy
from django.db.models import Q
from datetime import date, datetime
from django.utils.timezone import now
from functools import reduce
from .models import Patient, Contact, AuditLog
from .forms import EnrollPatient, PatientContact, PatientLocation
from .common.utils import ActionType

# Create your views here.

#CBV for Homepage
class HomepageView(generic.TemplateView):
    """Site home page"""

    template_name = 'index.html'

class PatientListView(generic.ListView):
    model = Patient
    template_name = 'patients/patient_list.html'
    paginate_by = 10    

    def get_queryset(self):
        
        #return Patient.objects.filter(is_patient=True,is_active=True)
        result = super(PatientListView, self).get_queryset()
        query = self.request.GET.get('q')
        if query:
            try:
                min_age = int(query) -5
                max_age = int(query) +5
                current = now().today()
                min_date = date(current.year - min_age, current.month, current.day)
                max_date = date(current.year - max_age, current.month, current.day)
                result = Patient.objects.filter(is_patient=True,is_active=True, dob__lte=min_date, dob__gte=max_date)

                #Create audit log
                AuditLog.objects.create(
                    action_type = "S",
                    narration = "An age based search was conducted for a %s year old patient" % query
                )

            except ValueError: 
                result = Patient.objects.filter(is_patient=True,is_active=True)
        else:
            result = Patient.objects.filter(is_patient=True,is_active=True)
        return result    
        

class PatientCreate(CreateView):
    form_class = EnrollPatient
    template_name = 'patients/patient_form.html'
    success_url = reverse_lazy('patients')

    def post(self, request):
        form = EnrollPatient(request.POST)

        if form.is_valid():

            #register new patient
            enrollment_number = datetime.today().strftime('%Y%m%d%H%M')
            Patient.objects.create(
                first_name = form.cleaned_data['first_name'],
                middle_name = form.cleaned_data['middle_name'],
                last_name = form.cleaned_data['last_name'],
                gender = form.cleaned_data['gender'],
                dob = form.cleaned_data['dob'],
                county = form.cleaned_data['county'],
                sub_county = form.cleaned_data['sub_county'],
                ward = form.cleaned_data['ward'],
                village = form.cleaned_data['village'],
                is_patient = True,
                enrollment_date = datetime.today(),
                enrollment_number = enrollment_number,
                is_nok = False
            )

            #Create audit log
            AuditLog.objects.create(
                action_type = "A",
                narration = "New patient added. Enrollment number %s" % (enrollment_number)
            )

            #redirect to different URL
            return HttpResponseRedirect(reverse('patients') )  

        #return error    
        return render(request, self.template_name,{'form': form})

class PatientUpdate(UpdateView):
    model = Patient
    form_class = EnrollPatient
    template_name = 'patients/patient_form.html'
    success_url = reverse_lazy('patients')

    def get(self, request, pk):
        patient = Patient.objects.get(id=pk)
        form = EnrollPatient(instance=patient, initial={'parent_patient_id':patient})

        return render(request, self.template_name, {'form':form, 'patient':patient, 'header_msg':'Edit'})

    def post(self, request, pk):
        #Create audit log
        patient = Patient.objects.get(id=pk)
        AuditLog.objects.create(
            action_type = "E",
            narration = "Bio data edited for patient with enrollment number %s" % (patient.enrollment_number)
        )
        return super(PatientUpdate, self).post(request)

class PatientLocationUpdate(UpdateView):
    model = Patient
    form_class = PatientLocation
    template_name = 'patients/patient_form.html'
    success_url = reverse_lazy('patients')

    def post(self, request, pk):
        #Create audit log
        patient = Patient.objects.get(id=pk)
        AuditLog.objects.create(
            action_type = "E",
            narration = "Location data edited for patient with enrollment number %s editted" % (patient.enrollment_number)
        )
        return super(PatientLocationUpdate, self).post(request)

class PatientDelete(DeleteView):
    model = Patient
    success_url = reverse_lazy('patients')
    template_name = 'patients/patient_confirm_delete.html'

    def post(self, request, pk):
        #get the object
        patient = self.get_object()

        if patient.is_nok:
            patient.is_patient = False
        else:    
            patient.is_active = False
        patient.date_deleted = datetime.today()
        patient.save()

        #Create audit log
        AuditLog.objects.create(
            action_type = "D",
            narration = "Patient deleted. Enrollment number %s" % (patient.enrollment_number)
        )

        #redirect to different URL
        return HttpResponseRedirect(reverse('patients') )  

class PatientDeletedListView(generic.ListView):
    model = Patient
    template_name = 'patients/deleted_patients_list.html'
    paginate_by = 10    

    def get_queryset(self):
        return Patient.objects.filter(is_patient=False, date_deleted__isnull=False)

###########################################
# Patient contact section
###########################################
class PatientContactListView(generic.ListView):
    model = Contact
    template_name = 'contacts/contact_list.html'
    paginate_by = 10    

    def get(self, request, pk):
        contact_list = Contact.objects.filter(patient=pk).filter(is_active=True)
        patient = Patient.objects.get(id=pk)
        return render(request,self.template_name, context={'contact_list':contact_list,'patient':patient})

class ContactCreate(CreateView):
    form_class = PatientContact
    success_url = reverse_lazy('patients')

    def get(self, request, patient):
        form = PatientContact(initial={'patient':patient})

        return render(request, 'contacts/contact_form.html', {'form':form, 'patient':patient,})
    
    def post(self, request, patient):
        #Create audit log
        patient = Patient.objects.get(id=patient)
        AuditLog.objects.create(
            action_type = "A",
            narration = "New contact added for patient with enrollment number %s" % (patient.enrollment_number)
        )
        return super(ContactCreate, self).post(request)

class ContactDelete(DeleteView):
    model = Contact
    success_url = reverse_lazy('patients')
    template_name = 'contacts/contact_confirm_delete.html'

    def post(self, request, pk):
        #get the object
        contact = self.get_object()
        contact.is_active = False
        contact.save()

        #Create audit log
        AuditLog.objects.create(
            action_type = "D",
            narration = "Contact deleted."
        )

        #redirect to different URL
        return HttpResponseRedirect(reverse('patients') )  

###########################################
# Patient next of kin section
###########################################
class PatientNokListView(generic.ListView):
    model = Patient
    template_name = 'nok/nok_list.html'
    paginate_by = 10    

    def get(self, request, patient):
        patient_obj = Patient.objects.get(id=patient)
        nok_list = patient_obj.nok.filter(is_nok=True, is_active=True).all()
        #nok_list = nok_prelim_list.fetch(is_active=True)
        patient = Patient.objects.get(id=patient)
        return render(request,self.template_name, context={'nok_list':nok_list,'patient':patient})

class PatientNokCreate(CreateView):
    form_class = EnrollPatient
    success_url = reverse_lazy('patients')

    def get(self, request, patient):
        form = EnrollPatient(initial={'parent_patient_id':patient})

        return render(request, 'nok/nok_form.html', {'form':form, 'patient':patient,})

    def post(self, request, patient):
        form = EnrollPatient(request.POST)

        if form.is_valid():

            #register new patient
            nok = Patient.objects.create(
                first_name = form.cleaned_data['first_name'],
                middle_name = form.cleaned_data['middle_name'],
                last_name = form.cleaned_data['last_name'],
                gender = form.cleaned_data['gender'],
                dob = form.cleaned_data['dob'],
                county = form.cleaned_data['county'],
                sub_county = form.cleaned_data['sub_county'],
                ward = form.cleaned_data['ward'],
                village = form.cleaned_data['village'],
                is_patient = False,
                is_nok = True
            )

            #update nok table
            this_patient = Patient.objects.get(id=form.cleaned_data['parent_patient_id'])
            this_patient.nok.add(nok)
            this_patient.save()

            #Create audit log
            patient = Patient.objects.get(id=patient)
            AuditLog.objects.create(
                action_type = "A",
                narration = "New next of kin added for patient with enrollment number %s" % (patient.enrollment_number)
            )

            #redirect to different URL
            return HttpResponseRedirect(reverse('patients') )  

        #return error    
        return render(request, self.template_name,{'form': form})

class PatientNokUpdate(UpdateView):
    model = Patient
    form_class = EnrollPatient
    template_name = 'nok/nok_form.html'
    success_url = reverse_lazy('patients')

    def get(self, request, patient, pk):
        nok = Patient.objects.get(id=pk)
        form = EnrollPatient(instance=nok, initial={'parent_patient_id':patient})

        return render(request, self.template_name, {'form':form, 'patient':patient, 'header_msg':'Edit'})

    def post(self, request, patient, pk):
        #Create audit log
        patient = Patient.objects.get(id=patient)
        AuditLog.objects.create(
            action_type = "E",
            narration = "Next of kin edited for patient with enrollment number %s" % (patient.enrollment_number)
        )
        return super(PatientNokUpdate, self).post(request)
    
class PatientNokLocationUpdate(UpdateView):
    model = Patient
    form_class = PatientLocation
    template_name = 'nok/nok_form.html'
    success_url = reverse_lazy('patients')

    def get(self, request, patient, pk):
        nok = Patient.objects.get(id=pk)
        form = EnrollPatient(instance=nok, initial={'parent_patient_id':patient})

        return render(request, self.template_name, {'form':form, 'patient':patient, 'header_msg':'Edit'})
    
class PatientNokEnroll(DeleteView):
    model = Patient
    success_url = reverse_lazy('patients')
    template_name = 'nok/nok_confirm_patient_enrollment.html'

    def post(self, request, pk):
        #get the object
        patient = self.get_object()
        patient.is_patient = True
        patient.enrollment_date = datetime.today()
        patient.enrollment_number = datetime.today().strftime('%Y%m%d%H%M')
        patient.save()

        #redirect to different URL
        return HttpResponseRedirect(reverse('patients') )  

class PatientNokDelete(DeleteView):
    model = Patient
    success_url = reverse_lazy('patients')
    template_name = 'nok/nok_confirm_delete.html'

    def post(self, request, pk):
        #get the object
        patient = self.get_object()
        if patient.is_patient:
            patient.is_nok = False
        else:    
            patient.is_active = False
        patient.save()

        #redirect to different URL
        return HttpResponseRedirect(reverse('patients') )  

class AuditLogListView(generic.ListView):
    model = AuditLog
    template_name = 'audit/auditlogs_list.html'
    paginate_by = 10 