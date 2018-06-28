import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ChangeSetComponent } from './change-set.component';
import { ChangeSetDetailComponent } from './change-set-detail.component';
import { ChangeSetPopupComponent } from './change-set-dialog.component';
import { ChangeSetDeletePopupComponent } from './change-set-delete-dialog.component';

export const changeSetRoute: Routes = [
    {
        path: 'change-set',
        component: ChangeSetComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'patientManegementTaskApp.changeSet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'change-set/:id',
        component: ChangeSetDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'patientManegementTaskApp.changeSet.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const changeSetPopupRoute: Routes = [
    {
        path: 'change-set-new',
        component: ChangeSetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'patientManegementTaskApp.changeSet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'change-set/:id/edit',
        component: ChangeSetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'patientManegementTaskApp.changeSet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'change-set/:id/delete',
        component: ChangeSetDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'patientManegementTaskApp.changeSet.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
