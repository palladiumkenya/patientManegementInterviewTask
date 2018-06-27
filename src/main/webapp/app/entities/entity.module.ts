import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PatientManegementTaskPatientModule } from './patient/patient.module';
import { PatientManegementTaskContactModule } from './contact/contact.module';
import { PatientManegementTaskEnrollmentModule } from './enrollment/enrollment.module';
import { PatientManegementTaskNextOfKinModule } from './next-of-kin/next-of-kin.module';
import { PatientManegementTaskChangeSetModule } from './change-set/change-set.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PatientManegementTaskPatientModule,
        PatientManegementTaskContactModule,
        PatientManegementTaskEnrollmentModule,
        PatientManegementTaskNextOfKinModule,
        PatientManegementTaskChangeSetModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PatientManegementTaskEntityModule {}
