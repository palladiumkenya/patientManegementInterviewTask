import {Component, OnInit, ViewChild} from '@angular/core';
import { PatientService } from '../../patient.service';
import { PatientResourceService } from '../../patient-resource.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-next-kin-list',
  templateUrl: './edit-next-of-kin.component.html',
  styleUrls: ['./edit-next-of-kin.component.css']
})
export class EditNextOfKinComponent implements OnInit {
  public display: boolean = false;
  public subCounty: string;
  public ward: string;
  public village: string;
  public county: string;
  public selectedPersonId: any;
  public errors: any = [];
  public showSuccessAlert: boolean = false;
  public showErrorAlert: boolean = false;
  public successAlert: string;
  public errorAlert: string;
  public errorTitle: string;
  public nextOfKinList: any;

  constructor(private patientService: PatientService,
              private router: Router,
              private route: ActivatedRoute,
              private patientResourceService: PatientResourceService) { }

  ngOnInit() {
    this.getNextOfkinList();
  }

  public getNextOfkinList() {
    this.patientService.getloadepatient().subscribe(
      (data) => {
        if (data) {
          this.selectedPersonId = data.person_id;
          console.log('this.selectedPersonId', this.selectedPersonId);
          this.patientResourceService.getPatientNextOfKinList(this.selectedPersonId).subscribe(
            (result) => {
              console.log('result', result);
              this.nextOfKinList = result;
            });
        }

      });
  }
/*  public editLocationList() {
    this.errors = [];
    this.successAlert = '';

    if (this.errors.length === 0) {
      const locationListPayload = {
        sub_county: this.subCounty,
        county: this.county,
        village: this.village,
        ward: this.ward
      };
      this.patientResourceService.updateLocation(this.selectedPersonId,
        locationListPayload).subscribe(
        (success) => {
          if ( success ) {
            this.displaySuccessAlert('location edited Successfully');
            this.patientResourceService.getPatientById(this.selectedPersonId).subscribe(
              (edited) => {
                this.patientService.setLoadedPatient(edited);
              });
            setTimeout(() => {
              this.display = false;
              this.router.navigate(['starter']);
            }, 500);

          }

        },
        (error) => {
          console.error('error', error);
          this.errors.push({
            message: 'error editing location'
          });
        }
      );
    }
  }*/
 /* showDialog() {
    this.display = true;
  }
  dismissDialog() {
    this.display = false;
  }*/
  public displaySuccessAlert(message) {
    this.showErrorAlert = false;
    this.showSuccessAlert = true;
    this.successAlert = message;
    setTimeout(() => {
      this.showSuccessAlert = false;
      this.display = false;
    }, 250);
  }
  public displayErrorAlert(errorTitle, errorMessage) {
    this.showErrorAlert = true;
    this.errorAlert = errorMessage;
    this.errorTitle = errorTitle;
  }


}
