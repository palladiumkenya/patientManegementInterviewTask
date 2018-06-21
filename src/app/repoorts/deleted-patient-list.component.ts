import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import {PatientResourceService} from '../patient-resource.service';
import * as Moment from 'moment';

@Component({
    selector: 'deleted-patient-summary',
    templateUrl: './deleted-patient-list.component.html',
    styleUrls: []
})
export class DeletedPatientComponent implements OnInit, OnDestroy {
    public patientList: Array<any> = [];
    public subscription: Subscription;
    public experiencedLoadingError: boolean = false;
    public dataLoaded: boolean = false;
    public errors: any = [];
    public isLoading: boolean;
    public nextStartIndex: number = 0;

    constructor(
                private patientResourceService: PatientResourceService) {
    }

    public ngOnInit() {
        this.getPatient();
    }

    public ngOnDestroy(): void {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

  public getPatient() {
    const sub = this.patientResourceService.getVoidedPatients();
    if ( sub ) {
      sub.subscribe(
        (res) => {
          if (res) {
            this.patientList = this.formatDateField(res);
          }

        },
        (error) => {

        }
      );
    }

  }

  private formatDateField(result) {
    const list = [];
    for (let i = 0; i < result.length; ++i) {
      const data = result[i];
      for (const r in data) {
        if (data.hasOwnProperty(r)) {
          const dateDeleted = Moment(data.date_voided).format('DD-MM-YYYY');
          data['dateDeleted'] = dateDeleted;
          data['#'] = i + 1;
        }
      }
      list.push(data);
    }
    return list;

  }
}
