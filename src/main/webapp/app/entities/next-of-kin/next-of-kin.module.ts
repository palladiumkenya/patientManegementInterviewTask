import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientManegementTaskSharedModule } from '../../shared';
import {
    NextOfKinService,
    NextOfKinPopupService,
    NextOfKinComponent,
    NextOfKinDetailComponent,
    NextOfKinDialogComponent,
    NextOfKinPopupComponent,
    NextOfKinDeletePopupComponent,
    NextOfKinDeleteDialogComponent,
    nextOfKinRoute,
    nextOfKinPopupRoute,
} from './';

const ENTITY_STATES = [
    ...nextOfKinRoute,
    ...nextOfKinPopupRoute,
];

@NgModule({
    imports: [
        PatientManegementTaskSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NextOfKinComponent,
        NextOfKinDetailComponent,
        NextOfKinDialogComponent,
        NextOfKinDeleteDialogComponent,
        NextOfKinPopupComponent,
        NextOfKinDeletePopupComponent,
    ],
    entryComponents: [
        NextOfKinComponent,
        NextOfKinDialogComponent,
        NextOfKinPopupComponent,
        NextOfKinDeleteDialogComponent,
        NextOfKinDeletePopupComponent,
    ],
    providers: [
        NextOfKinService,
        NextOfKinPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PatientManegementTaskNextOfKinModule {}
