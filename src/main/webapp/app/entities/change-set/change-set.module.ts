import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientManegementTaskSharedModule } from '../../shared';
import {
    ChangeSetService,
    ChangeSetPopupService,
    ChangeSetComponent,
    ChangeSetDetailComponent,
    ChangeSetDialogComponent,
    ChangeSetPopupComponent,
    ChangeSetDeletePopupComponent,
    ChangeSetDeleteDialogComponent,
    changeSetRoute,
    changeSetPopupRoute,
} from './';

const ENTITY_STATES = [
    ...changeSetRoute,
    ...changeSetPopupRoute,
];

@NgModule({
    imports: [
        PatientManegementTaskSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChangeSetComponent,
        ChangeSetDetailComponent,
        ChangeSetDialogComponent,
        ChangeSetDeleteDialogComponent,
        ChangeSetPopupComponent,
        ChangeSetDeletePopupComponent,
    ],
    entryComponents: [
        ChangeSetComponent,
        ChangeSetDialogComponent,
        ChangeSetPopupComponent,
        ChangeSetDeleteDialogComponent,
        ChangeSetDeletePopupComponent,
    ],
    providers: [
        ChangeSetService,
        ChangeSetPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PatientManegementTaskChangeSetModule {}
