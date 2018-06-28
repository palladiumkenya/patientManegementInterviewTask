import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChangeSet } from './change-set.model';
import { ChangeSetPopupService } from './change-set-popup.service';
import { ChangeSetService } from './change-set.service';

@Component({
    selector: 'jhi-change-set-delete-dialog',
    templateUrl: './change-set-delete-dialog.component.html'
})
export class ChangeSetDeleteDialogComponent {

    changeSet: ChangeSet;

    constructor(
        private changeSetService: ChangeSetService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.changeSetService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'changeSetListModification',
                content: 'Deleted an changeSet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-change-set-delete-popup',
    template: ''
})
export class ChangeSetDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private changeSetPopupService: ChangeSetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.changeSetPopupService
                .open(ChangeSetDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
