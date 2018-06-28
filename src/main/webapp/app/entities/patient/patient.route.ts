import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PatientComponent } from './patient.component';
import { PatientDetailComponent } from './patient-detail.component';
import { PatientPopupComponent } from './patient-dialog.component';
import { PatientDeletePopupComponent } from './patient-delete-dialog.component';
import {PatientNewComponent} from './patient-new.component';

export const patientRoute: Routes = [
    {
        path: 'patient',
        component: PatientComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'patientManegementTaskApp.patient.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'patient/:id',
        component: PatientDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'patientManegementTaskApp.patient.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'patient-add',
        component: PatientNewComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'patientManegementTaskApp.patient.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const patientPopupRoute: Routes = [
    {
        path: 'patient-new',
        component: PatientPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'patientManegementTaskApp.patient.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'patient/:id/edit',
        component: PatientPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'patientManegementTaskApp.patient.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'patient/:id/delete',
        component: PatientDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'patientManegementTaskApp.patient.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
