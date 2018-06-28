import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { NextOfKinComponent } from './next-of-kin.component';
import { NextOfKinDetailComponent } from './next-of-kin-detail.component';
import { NextOfKinPopupComponent } from './next-of-kin-dialog.component';
import { NextOfKinDeletePopupComponent } from './next-of-kin-delete-dialog.component';

export const nextOfKinRoute: Routes = [
    {
        path: 'next-of-kin',
        component: NextOfKinComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'patientManegementTaskApp.nextOfKin.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'next-of-kin/:id',
        component: NextOfKinDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'patientManegementTaskApp.nextOfKin.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nextOfKinPopupRoute: Routes = [
    {
        path: 'next-of-kin-new',
        component: NextOfKinPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'patientManegementTaskApp.nextOfKin.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'next-of-kin/:id/edit',
        component: NextOfKinPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'patientManegementTaskApp.nextOfKin.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'next-of-kin/:id/delete',
        component: NextOfKinDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'patientManegementTaskApp.nextOfKin.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
