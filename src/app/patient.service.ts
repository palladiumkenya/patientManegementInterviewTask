import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PatientService {
  public patientData;
  private isPatientData = new BehaviorSubject(this.patientData);

  constructor() { }
  public setLoadedPatient(patient) {
    this.isPatientData.next(patient);
  }
  public getloadepatient() {
    return this.isPatientData;

  }

}
