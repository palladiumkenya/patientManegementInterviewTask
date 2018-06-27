from django_elasticsearch_dsl import DocType, Index
from data.models import Patient, Kin


patients = Index('patients')  # create an index called patients


@patients.doc_type
class PatientDocument(DocType):
    class Meta:
        model = Patient
        fields = ['id_number', 'cell_phone']  # the fields to search by

