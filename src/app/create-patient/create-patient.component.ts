import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientResourceService } from '../patient-resource.service';




@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {
  public genderOptions = [
    { label: 'Female', val: 'F' },
    { label: 'Male', val: 'M' }
  ];
  public subscription: Subscription;
  public name: string;
  public gender: string;
  public email: string;
  public patientPhoneNumber: number;
  public alternativePhoneNumber: number;
  public county: any;
  public subCounty: any;
  public ward: any;
  public village: any;
  public nextKinPhoneNumber: number;
  public dateOfEnroloment: any;
  public dateOfbirth: any;
  public nextOfKinName: string;

  public errors: any = [];
  public showSuccessAlert: boolean = false;
  public showErrorAlert: boolean = false;
  public successAlert: string;
  public errorAlert: string;
  public errorTitle: string;
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: true
  };
  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];

  public date: any;

  constructor(private patientResourceService: PatientResourceService) { }

  ngOnInit() {
    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');
  }
  public addPatient() {
    console.log('getting here');
    this.errors = [];
    this.successAlert = '';

    if (this.name === '' || this.name === undefined || this.name === 'undefined') {
      this.displayErrorAlert('Validation Error!',
        'Please fill cohort name field');
    }
    if (this.gender === '' || this.gender === undefined
      || this.gender === 'undefined') {
      this.displayErrorAlert('Validation Error!',
        'Please give the description of the cohort');
    }

    if ( this.name && this.gender) {
      const addPatientPayload = {
        name: this.name,
        gender: this.gender,
        birth_date: this.dateOfbirth,
        county: this.county ? this.county : 'null',
        sub_county: this.subCounty ? this.subCounty : 'null',
        ward: this.ward ? this.ward : 'null',
        village: this.village ? this.village : 'null',
        phone_number: this.patientPhoneNumber ? this.patientPhoneNumber.toString() : 0,
        email_address: this.email ? this.email : 'null',
        alternative_phone_number: this.alternativePhoneNumber ? this.alternativePhoneNumber.toString() : 0,
       // next_of_phone_number: this.nextKinPhoneNumber ? this.nextKinPhoneNumber.toString() : 0,
        date_of_enrollement: this.dateOfEnroloment


      };
      console.log('addPatientPayload==', addPatientPayload);
      this.patientResourceService.createPatient( addPatientPayload).subscribe(
        (success) => {
          this.displaySuccessAlert('Record added Successfully');
          if ( success ) {
            this.name = '';
            this.gender = '';
            this.dateOfbirth = '';
            this.county = '';
            this.subCounty = '';
            this.ward = '';
            this.village = '';
            this.email = '';
            this.dateOfEnroloment = '';
            this.patientPhoneNumber = 0;
            this.alternativePhoneNumber = 0;
            this.nextKinPhoneNumber = 0;
          }

        },
        (error) => {
          console.error('error', error);
          this.errors.push({
            message: 'error adding record'
          });
        }
      );
    }
  }
  public displaySuccessAlert(message) {
    this.showErrorAlert = false;
    this.showSuccessAlert = true;
    this.successAlert = message;
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3000);
  }
  public displayErrorAlert(errorTitle, errorMessage) {
    this.showErrorAlert = true;
    this.errorAlert = errorMessage;
    this.errorTitle = errorTitle;
  }

}
