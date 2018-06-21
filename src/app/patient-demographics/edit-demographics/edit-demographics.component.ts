import {Component, OnInit, ViewChild} from '@angular/core';
import {PatientService} from '../../patient.service';
import {PatientResourceService} from '../../patient-resource.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-edit-demographics',
  templateUrl: './edit-demographics.component.html',
  styleUrls: ['./edit-demographics.component.css']
})
export class EditDemographicsComponent implements OnInit {
  public display: boolean = false;
  public selectedPersonId: any;
  public errors: any = [];
  public showSuccessAlert: boolean = false;
  public showErrorAlert: boolean = false;
  public successAlert: string;
  public errorAlert: string;
  public errorTitle: string;
  public name: string;
  public gender: string;
  public birth_date: any;
  public genderOptions = [
    { label: 'Female', val: 'F' },
    { label: 'Male', val: 'M' }
  ];
  private _datePipe: DatePipe;

  constructor(private patientService: PatientService,
              private router: Router,
              private route: ActivatedRoute,
              private patientResourceService: PatientResourceService) {
    this._datePipe = new DatePipe('en-US');
  }

  ngOnInit() {
    this.getDemographicsToEdit();
  }
  public getDemographicsToEdit() {
    this.patientService.getloadepatient().subscribe(
      (data) => {
        if (data) {
          this.name = data.name;
          this.gender = data.gender;
          this.birth_date  = this._datePipe.transform(
            data.birth_date, 'yyyy-MM-dd');
          this.selectedPersonId = data.person_id;
        }

      });
  }
  public editDemographics() {
    this.errors = [];
    this.successAlert = '';
    if (this.errors.length === 0) {
      const personPayload = {
        name: this.name,
        gender: this.gender,
        birth_date: this.birth_date,
      };
      this.patientResourceService.updatePerson(this.selectedPersonId,
        personPayload).subscribe(
        (success) => {
          if ( success ) {
            this.displaySuccessAlert('demographics edited Successfully');
            this.patientResourceService.getPatientById(this.selectedPersonId).subscribe(
              (edited) => {
                this.patientService.setLoadedPatient(edited);
              }
            );
            setTimeout(() => {
              this.display = false;
              this.router.navigate(['starter']);
            }, 500);

          }

        },
        (error) => {
          console.error('error', error);
          this.errors.push({
            message: 'error editing demographics'
          });
        }
      );
    }
  }
  showDialog() {
    this.display = true;
  }
  dismissDialog() {
    this.display = false;
  }
  public displaySuccessAlert(message) {
    this.showErrorAlert = false;
    this.showSuccessAlert = true;
    this.successAlert = message;
    setTimeout(() => {
      this.display = false;
      this.showSuccessAlert = false;
    }, 250);
  }
  public displayErrorAlert(errorTitle, errorMessage) {
    this.showErrorAlert = true;
    this.errorAlert = errorMessage;
    this.errorTitle = errorTitle;
  }

}
