import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientManegementTaskSharedModule } from '../../shared';
import {
    EnrollmentService,
    EnrollmentPopupService,
    EnrollmentComponent,
    EnrollmentDetailComponent,
    EnrollmentDialogComponent,
    EnrollmentPopupComponent,
    EnrollmentDeletePopupComponent,
    EnrollmentDeleteDialogComponent,
    enrollmentRoute,
    enrollmentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...enrollmentRoute,
    ...enrollmentPopupRoute,
];

@NgModule({
    imports: [
        PatientManegementTaskSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EnrollmentComponent,
        EnrollmentDetailComponent,
        EnrollmentDialogComponent,
        EnrollmentDeleteDialogComponent,
        EnrollmentPopupComponent,
        EnrollmentDeletePopupComponent,
    ],
    entryComponents: [
        EnrollmentComponent,
        EnrollmentDialogComponent,
        EnrollmentPopupComponent,
        EnrollmentDeleteDialogComponent,
        EnrollmentDeletePopupComponent,
    ],
    providers: [
        EnrollmentService,
        EnrollmentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PatientManegementTaskEnrollmentModule {}
