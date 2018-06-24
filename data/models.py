from django.db import models


class Patient(models.Model):
    # the bio-data
    id_number = models.IntegerField(blank=False)  # if patient has no id use guardian's/kin's ID
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    weight = models.IntegerField()  # in kilograms
    height = models.IntegerField()  # in centimeters
    age = models.IntegerField()

    # location details
    county = models.CharField(max_length=20)
    sub_county = models.CharField(max_length=20)
    ward = models.CharField(max_length=20)
    village = models.CharField(max_length=20)

    # contact details
    cell_phone = models.IntegerField()  # cell phone numbers max is 10 digits
    email = models.EmailField()
    alternate_cell = models.IntegerField()

    # enrollment details
    enroll_date = models.DateField(auto_now_add=True)
    enroll_number = models.IntegerField()

    class Meta:
        verbose_name_plural = "Patients"

    def __str__(self):
        return str("%s, %s" % (self.first_name, self.last_name))


class Kin(models.Model):
    first_name = models.CharField(max_length=10)
    last_name = models.CharField(max_length=10)
    id_number = models.IntegerField()
    cell_phone = models.IntegerField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Kin'

    def __str__(self):
        return str("%s, %s" % (self.first_name, self.last_name))








