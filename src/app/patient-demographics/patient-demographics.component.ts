import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import * as Moment from 'moment';

@Component({
  selector: 'app-patient-demographics',
  templateUrl: './patient-demographics.component.html',
  styleUrls: ['./patient-demographics.component.css']
})
export class PatientDemographicsComponent implements OnInit {
  public demographics: string;
  public formatDate: any;

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.getLoadedPatient();
  }


  public getLoadedPatient() {
    this.patientService.getloadepatient().subscribe(
      (data) => {
        this.demographics = data;
        this.formatDate = Moment(data.birth_date).format('DD-MM-YYYY');
        console.log('this.formatDate', this.formatDate );
      }
    );

  }


}
