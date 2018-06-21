import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  public display: boolean = false;
  public subscription: Subscription;
  public contacts: any;
  private nextofkinPhoneNumber: number;
  private patnerPhoneNumber: number;
  private patientPhoneNumber: number;
  private alternativePhoneNumber: number;

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.getLoadedPatient();
  }
  public getLoadedPatient() {
     this.patientService.getloadepatient().subscribe((data) => {
       this.contacts = data;

     });

  }

}
