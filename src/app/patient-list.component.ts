import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {PatientResourceService} from './patient-resource.service';
declare var AdminLTE: any;
@Component({
  selector: 'patient-list-cohort',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  public isBusy: boolean = false;
  public selectedPatientId: any;
  public selectedCohortListName: any;
  public fetchingResults: boolean = false;
  public patientList: any;
  public nextOfKinList: any;
  public fetchError: boolean = false;
  public displayConfirmDialog: boolean = false;
  public showSuccessAlert: boolean = false;
  public showErrorAlert: boolean = false;
  public successAlert: string;
  public errorAlert: string;
  public errorTitle: string;
  public selectedPersonId: any;
  public gender: string;
  public birth_date: any;
  public genderOptions = [
    { label: 'Female', val: 'F' },
    { label: 'Male', val: 'M' }
  ];
  public display = false;
  public nextOfKinName: string;
  public nextKinPhoneNumber: number;
  public alternativePhoneNumber: number;
  public displayNextOfKinDialog = false;
  public patientName: any;
  public displayEnrollment = false;
  public dateOfEnrollment: any;
  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private patientResourceService: PatientResourceService
  ) {
  }

  public ngOnInit() {
    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');
    this.getPatientList();
  }
  public getPatientList() {
    this.fetchingResults = true;
    const sub = this.patientResourceService.getAllPatients();
    if ( sub ) {
       sub.subscribe(
         (res) => {
            if (res) {
           this.patientList = res;
           this.fetchingResults = false;
            }

         },
         (error) => {
           this.fetchError = true;

         }
       );
     }

  }

  public openConfirmDialog(v) {
    this.selectedPatientId = v.person_id;
    this.selectedCohortListName = v.name;
    this.displayConfirmDialog = true;

  }

  public closeConfirmationDialog() {
    this.displayConfirmDialog = false;
  }
  public voidPatient() {
    if (this.selectedPatientId) {
      this.patientResourceService.voidPatient(this.selectedPatientId).subscribe(
        (success) => {
          this.displayConfirmDialog = false;
          this.displaySuccessAlert('patient deleted successfully');
          this.getPatientList();
        },
        (error) => {
          console.error('The request failed because of the following ', error);
          this.displayErrorAlert('Error!',
            'System encountered an error while deleting the cohort. Please retry.');
        });
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
    setTimeout(() => {
      this.showErrorAlert = false;
    }, 3000);
  }
  public openDialog(v) {
    this.selectedPatientId = v.person_id;
    this.patientName = v.name;
    this.display = true;
  }
  public dismissDialog() {
    this.display = false;
  }
  public AddNextOfKIn() {
    //   this.errors = [];
    this.successAlert = '';

    if (this.nextOfKinName === '' || this.nextOfKinName === undefined || this.nextOfKinName === 'undefined') {
      this.displayErrorAlert('Validation Error!',
        'Please fill name field');
    }
    if (this.gender === '' || this.gender === undefined
      || this.gender === 'undefined') {
      this.displayErrorAlert('Validation Error!',
        'Please give the description of the cohort');
    }

    if (this.nextOfKinName && this.gender) {
      const addNextOfKinPayload = {
        name: this.nextOfKinName,
        gender: this.gender,
        birth_date: this.birth_date,
        alternative_phone_number: this.alternativePhoneNumber ? this.alternativePhoneNumber.toString() : 0,
        phone_number: this.nextKinPhoneNumber ? this.nextKinPhoneNumber.toString() : 'null',

      };
      console.log('addNextOfKinPayload', addNextOfKinPayload);

      this.patientResourceService.createNextOfKin(this.selectedPatientId, addNextOfKinPayload).subscribe(
        (sucess) => {
          this.displaySuccessAlert('Next of Kin added successfully');
          this.display = false;
        });

    }
  }
  public openNextOfKinListDialog(v) {
    this.patientName = v.name;
    this.selectedPatientId = v.person_id;
    this.patientResourceService.getPatientNextOfKinList(this.selectedPatientId).subscribe(
      (result) => {
        this.nextOfKinList = result;
      });
    this.displayNextOfKinDialog = true;
  }
  public openEnrollNextOfKinListDialog(v) {
    this.selectedPersonId = v.person_id;
    this.displayEnrollment = true;

  }
  public closeEnrollDialog() {
    this.displayEnrollment = false;
  }

  public EnrollNextOfKinAsPatient() {
    if (this.dateOfEnrollment) {
      const enrollmentPayload = {
        date_of_enrollement: this.dateOfEnrollment
      };
      this.patientResourceService.enrollNextOfKinAsPatient(this.selectedPersonId, enrollmentPayload).subscribe(
        (sucess) => {
          this.displaySuccessAlert('Patient added successfully');
          this.displayEnrollment = false;
        });

    }

  }

}
