import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { NextOfKin } from './next-of-kin.model';
import { NextOfKinService } from './next-of-kin.service';

@Component({
    selector: 'jhi-next-of-kin-detail',
    templateUrl: './next-of-kin-detail.component.html'
})
export class NextOfKinDetailComponent implements OnInit, OnDestroy {

    nextOfKin: NextOfKin;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private nextOfKinService: NextOfKinService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNextOfKins();
    }

    load(id) {
        this.nextOfKinService.find(id)
            .subscribe((nextOfKinResponse: HttpResponse<NextOfKin>) => {
                this.nextOfKin = nextOfKinResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNextOfKins() {
        this.eventSubscriber = this.eventManager.subscribe(
            'nextOfKinListModification',
            (response) => this.load(this.nextOfKin.id)
        );
    }
}
