import {Component, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../patient.service';
import {PatientResourceService} from '../../patient-resource.service';

@Component({
  selector: 'app-edit-contacts',
  templateUrl: './edit-contacts.component.html',
  styleUrls: ['./edit-contacts.component.css']
})
export class EditContactsComponent implements OnInit {
  public email_address: string;
  public phone_number: string;
  public alternative_phone_number: string;
  public selectedPersonId: string;
  public display: boolean = false;
  public errors: any = [];
  public showSuccessAlert: boolean = false;
  public showErrorAlert: boolean = false;
  public successAlert: string;
  public errorAlert: string;
  public errorTitle: string;

  constructor(
    private patientResourceService: PatientResourceService,
              private patientService: PatientService,
              private router: Router,
              private route: ActivatedRoute) { }
  public ngOnInit() {
    this.getContactListToEdit();

  }
  public getContactListToEdit() {
     this.patientService.getloadepatient().subscribe(
      (data) => {
        if (data) {
          this.email_address = data.email_address;
          this.phone_number = data.phone_number;
          this.alternative_phone_number = data.alternative_phone_number;
          this.selectedPersonId = data.person_id;
        }

      });
  }
  public editContactList() {
    this.errors = [];
    this.successAlert = '';

    if (this.errors.length === 0) {
      const contactListPayload = {
        phone_number: this.phone_number,
        alternative_phone_number: this.alternative_phone_number,
        email_address: this.email_address,
      };
      this.patientResourceService.updateContacts(this.selectedPersonId,
        contactListPayload).subscribe(
        (success) => {
          if ( success ) {
            this.displaySuccessAlert('contacts edited Successfully');
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
            message: 'error editing contact'
          });
        }
      );
    }
  }
  showDialog() {
    this.display = true;
  }
  close() {
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
