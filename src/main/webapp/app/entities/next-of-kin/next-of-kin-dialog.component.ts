import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NextOfKin } from './next-of-kin.model';
import { NextOfKinPopupService } from './next-of-kin-popup.service';
import { NextOfKinService } from './next-of-kin.service';

@Component({
    selector: 'jhi-next-of-kin-dialog',
    templateUrl: './next-of-kin-dialog.component.html'
})
export class NextOfKinDialogComponent implements OnInit {

    nextOfKin: NextOfKin;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private nextOfKinService: NextOfKinService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
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
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-next-of-kin-popup',
    template: ''
})
export class NextOfKinPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private nextOfKinPopupService: NextOfKinPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.nextOfKinPopupService
                    .open(NextOfKinDialogComponent as Component, params['id']);
            } else {
                this.nextOfKinPopupService
                    .open(NextOfKinDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
