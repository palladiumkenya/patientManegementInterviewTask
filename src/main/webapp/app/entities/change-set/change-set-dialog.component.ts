import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChangeSet } from './change-set.model';
import { ChangeSetPopupService } from './change-set-popup.service';
import { ChangeSetService } from './change-set.service';

@Component({
    selector: 'jhi-change-set-dialog',
    templateUrl: './change-set-dialog.component.html'
})
export class ChangeSetDialogComponent implements OnInit {

    changeSet: ChangeSet;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private changeSetService: ChangeSetService,
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
        if (this.changeSet.id !== undefined) {
            this.subscribeToSaveResponse(
                this.changeSetService.update(this.changeSet));
        } else {
            this.subscribeToSaveResponse(
                this.changeSetService.create(this.changeSet));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ChangeSet>>) {
        result.subscribe((res: HttpResponse<ChangeSet>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ChangeSet) {
        this.eventManager.broadcast({ name: 'changeSetListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-change-set-popup',
    template: ''
})
export class ChangeSetPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private changeSetPopupService: ChangeSetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.changeSetPopupService
                    .open(ChangeSetDialogComponent as Component, params['id']);
            } else {
                this.changeSetPopupService
                    .open(ChangeSetDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
