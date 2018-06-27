import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Patient } from './patient.model';
import { PatientService } from './patient.service';
import { NextOfKin, NextOfKinService } from '../next-of-kin';
import { Subscription } from 'rxjs/Subscription';
import {ContactService} from '../contact/contact.service';
import {Contact} from '../contact/contact.model';

@Component({
    selector: 'jhi-patient-add',
    templateUrl: './patient-new.component.html'
})
export class PatientNewComponent implements OnInit, OnDestroy {

    patient: Patient;
    contact: Contact;
    nextOfKin: NextOfKin;
    isSaving: boolean;

    nextofkins: NextOfKin[];
    dateOfBirthDp: any;

    date = {year: 2015, month: 2};
    minDate = {year: 1900, month: 1, date: 1};
    maxDate = {year: 2018, month: 12, date: 31};

    eventSubscriber: Subscription;

    constructor(
        private jhiAlertService: JhiAlertService,
        private patientService: PatientService,
        private nextOfKinService: NextOfKinService,
        private eventManager: JhiEventManager,
        private router: Router,
        private contactService: ContactService
    ) {
    }

    ngOnInit() {
        this.patient = new Patient();
        this.contact = new Contact();
        this.nextOfKin = new NextOfKin();
        this.isSaving = false;
        this.nextOfKinService.query()
            .subscribe((res: HttpResponse<NextOfKin[]>) => { this.nextofkins = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    ngOnDestroy() {
        // this.eventManager.destroy(this.eventSubscriber);
    }

    clear() {
        this.router.navigate(['/patient']);
    }

    save() {
        this.saveNextOfKin();
    }

    savePatient() {
        this.isSaving = true;
        if (this.patient.id !== undefined) {
            this.subscribeToSaveResponse(
                this.patientService.update(this.patient));
        } else {
            this.subscribeToSaveResponse(
                this.patientService.create(this.patient));
        }
    }

    saveContact() {
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
        this.router.navigate(['/patient']);
    }

    saveNextOfKin() {
        this.isSaving = true;
        if (this.nextOfKin.id !== undefined) {
            this.subscribeToSaveNextOfKinResponse(
                this.nextOfKinService.update(this.nextOfKin));
        } else {
            this.subscribeToSaveNextOfKinResponse(
                this.nextOfKinService.create(this.nextOfKin));
        }
    }

    private subscribeToSaveNextOfKinResponse(result: Observable<HttpResponse<NextOfKin>>) {
        result.subscribe((res: HttpResponse<NextOfKin>) =>
            this.onSaveNextOfKinSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveNextOfKinSuccess(result: NextOfKin) {
        this.eventManager.broadcast({ name: 'nextOfKinListModification', content: 'OK'});
        this.nextOfKin = result;
        this.patient.nextOfKin = result;
        this.savePatient();
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Patient>>) {
        result.subscribe((res: HttpResponse<Patient>) =>
            this.onSavePatientSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSavePatientSuccess(result: Patient) {
        console.log('patient :: ' + JSON.stringify(result));
        this.eventManager.broadcast({ name: 'patientListModification', content: 'OK'});
        this.patient = result;
        this.contact.patient = this.patient;
        this.saveContact();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackNextOfKinById(index: number, item: NextOfKin) {
        return item.id;
    }
}
