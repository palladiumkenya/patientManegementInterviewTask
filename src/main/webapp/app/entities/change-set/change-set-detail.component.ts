import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ChangeSet } from './change-set.model';
import { ChangeSetService } from './change-set.service';

@Component({
    selector: 'jhi-change-set-detail',
    templateUrl: './change-set-detail.component.html'
})
export class ChangeSetDetailComponent implements OnInit, OnDestroy {

    changeSet: ChangeSet;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private changeSetService: ChangeSetService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChangeSets();
    }

    load(id) {
        this.changeSetService.find(id)
            .subscribe((changeSetResponse: HttpResponse<ChangeSet>) => {
                this.changeSet = changeSetResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChangeSets() {
        this.eventSubscriber = this.eventManager.subscribe(
            'changeSetListModification',
            (response) => this.load(this.changeSet.id)
        );
    }
}
