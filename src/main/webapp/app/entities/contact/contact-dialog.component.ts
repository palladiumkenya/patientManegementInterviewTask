import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Contact } from './contact.model';
import { ContactPopupService } from './contact-popup.service';
import { ContactService } from './contact.service';
import { Patient, PatientService } from '../patient';

@Component({
    selector: 'jhi-contact-dialog',
    templateUrl: './contact-dialog.component.html'
})
export class ContactDialogComponent implements OnInit {

    contact: Contact;
    isSaving: boolean;

    patients: Patient[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private contactService: ContactService,
        private patientService: PatientService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.patientService
            .query({filter: 'contact-is-null'})
            .subscribe((res: HttpResponse<Patient[]>) => {
                if (!this.contact.patient || !this.contact.patient.id) {
                    this.patients = res.body;
                } else {
                    this.patientService
                        .find(this.contact.patient.id)
                        .subscribe((subRes: HttpResponse<Patient>) => {
                            this.patients = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.contact.id !== undefined) {
            this.subscribeToSaveContactResponse(
                this.contactService.update(this.contact));
        } else {
            this.subscribeToSaveContactResponse(
                this.contactService.create(this.contact));
        }
    }

    private subscribeToSaveContactResponse(result: Observable<HttpResponse<Contact>>) {
        result.subscribe((res: HttpResponse<Contact>) =>
            this.onSaveContactSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveContactSuccess(result: Contact) {
        this.eventManager.broadcast({ name: 'contactListModification', content: 'OK'});
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
    selector: 'jhi-contact-popup',
    template: ''
})
export class ContactPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contactPopupService: ContactPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.contactPopupService
                    .open(ContactDialogComponent as Component, params['id']);
            } else {
                this.contactPopupService
                    .open(ContactDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
