import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Enrollment } from './enrollment.model';
import { EnrollmentPopupService } from './enrollment-popup.service';
import { EnrollmentService } from './enrollment.service';
import { Patient, PatientService } from '../patient';

@Component({
    selector: 'jhi-enrollment-dialog',
    templateUrl: './enrollment-dialog.component.html'
})
export class EnrollmentDialogComponent implements OnInit {

    enrollment: Enrollment;
    isSaving: boolean;

    patients: Patient[];
    enrollmentDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private enrollmentService: EnrollmentService,
        private patientService: PatientService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.patientService.query()
            .subscribe((res: HttpResponse<Patient[]>) => { this.patients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.enrollment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.enrollmentService.update(this.enrollment));
        } else {
            this.subscribeToSaveResponse(
                this.enrollmentService.create(this.enrollment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Enrollment>>) {
        result.subscribe((res: HttpResponse<Enrollment>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Enrollment) {
        this.eventManager.broadcast({ name: 'enrollmentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPatientById(index: number, item: Patient) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-enrollment-popup',
    template: ''
})
export class EnrollmentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enrollmentPopupService: EnrollmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.enrollmentPopupService
                    .open(EnrollmentDialogComponent as Component, params['id']);
            } else {
                this.enrollmentPopupService
                    .open(EnrollmentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
