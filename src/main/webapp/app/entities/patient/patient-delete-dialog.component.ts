import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Patient } from './patient.model';
import { PatientPopupService } from './patient-popup.service';
import { PatientService } from './patient.service';
import {ChangeSetService} from '../change-set/change-set.service';
import {ChangeSet} from '../change-set/change-set.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Principal} from '../../shared/auth/principal.service';

@Component({
    selector: 'jhi-patient-delete-dialog',
    templateUrl: './patient-delete-dialog.component.html'
})
export class PatientDeleteDialogComponent implements OnInit {
    account: Account;
    changeSet: ChangeSet;
    patient: Patient;
    isSaving: boolean;

    constructor(
        private patientService: PatientService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private changeSetService: ChangeSetService,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.changeSet = new ChangeSet();
        this.principal.identity().then((account) => {
            this.account = account;
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.patient.isDeleted = true;
        this.patientService.update(this.patient).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'patientListModification',
                content: 'Deleted an patient'
            });
            this.saveChangeSet();
        });
    }

    private createDeletePatientChangeSet() {
        this.changeSet.entity = this.patient.id;
        this.changeSet.operation = 'Delete';
        this.changeSet.tableName = 'patient';
        this.changeSet.newValue = 'true';
        this.changeSet.oldValue = 'false';
        this.changeSet.columnName = 'isDeleted';
        this.changeSet.user = this.account.id;
    }

    saveChangeSet() {
        this.createDeletePatientChangeSet();
        this.isSaving = true;
        if (this.changeSet.id !== undefined) {
            this.subscribeToSaveChangesetResponse(
                this.changeSetService.update(this.changeSet));
        } else {
            this.subscribeToSaveChangesetResponse(
                this.changeSetService.create(this.changeSet));
        }
    }

    private subscribeToSaveChangesetResponse(result: Observable<HttpResponse<ChangeSet>>) {
        result.subscribe((res: HttpResponse<ChangeSet>) =>
            this.onSaveChangesetSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveChangesetSuccess(result: ChangeSet) {
        this.eventManager.broadcast({ name: 'changeSetListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-patient-delete-popup',
    template: ''
})
export class PatientDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private patientPopupService: PatientPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.patientPopupService
                .open(PatientDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
