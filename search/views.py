from django.shortcuts import render
from search.search import PatientDocument


# the search function to use ElasticSearch software
def search(request):
    q = request.GET.get('q')
    if q:
        patients = PatientDocument.search().query("match", id_number=q)
    else:
        patients = ''

    return render(request, 'search.html', {'patients': patients})

