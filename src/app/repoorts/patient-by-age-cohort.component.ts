import {
  Component, OnInit, OnDestroy, AfterViewInit, Input, Output,
  EventEmitter, ViewEncapsulation, forwardRef, ElementRef, ChangeDetectorRef
} from '@angular/core';

import { Subscription } from 'rxjs';
import {PatientResourceService} from '../patient-resource.service';
import * as Moment from 'moment';
import * as _ from 'lodash';

@Component({
    selector: 'patient-by-age-summary',
    templateUrl: './patient-by-age-cohort.component.html',
    styleUrls: []
})
export class PatientByAgeCohortComponent implements OnInit, OnDestroy {
  public patientList: Array<any> = [];
  public subscription: Subscription;
  public experiencedLoadingError: boolean = false;
  public dataLoaded: boolean = false;
  public errors: any = [];
  public someRange3 = [0, 120];
  public startAge: number = 0;
  public endAge: number = 0;

    constructor(
                private patientResourceService: PatientResourceService,
                private elementRef: ElementRef,
                private cd: ChangeDetectorRef) {
    }

    public ngOnInit() {
      this.startAge = 0;
      this.endAge = 120;
        console.log('someRange3', this.someRange3);
    }

    public ngOnDestroy(): void {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  public AgeChange(event) {
    this.startAge = event[0];
    this.endAge = event[1];

    console.log('this.startAge', event[0]);
    console.log('this.endAge', event[1]);
  }
  public generatePatientByAgeCohort() {
    const sub = this.patientResourceService.getPatientsByAgeCohort(this.startAge, this.endAge);
    if ( sub ) {
      sub.subscribe(
        (res) => {
          if (res) {
            console.log('res======', res);
            this.patientList = res;
          }

        },
        (error) => {

        }
      );
    }

  }

}
