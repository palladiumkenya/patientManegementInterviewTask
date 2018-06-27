import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NextOfKin } from './next-of-kin.model';
import { NextOfKinPopupService } from './next-of-kin-popup.service';
import { NextOfKinService } from './next-of-kin.service';

@Component({
    selector: 'jhi-next-of-kin-delete-dialog',
    templateUrl: './next-of-kin-delete-dialog.component.html'
})
export class NextOfKinDeleteDialogComponent {

    nextOfKin: NextOfKin;

    constructor(
        private nextOfKinService: NextOfKinService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nextOfKinService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'nextOfKinListModification',
                content: 'Deleted an nextOfKin'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-next-of-kin-delete-popup',
    template: ''
})
export class NextOfKinDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private nextOfKinPopupService: NextOfKinPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.nextOfKinPopupService
                .open(NextOfKinDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
