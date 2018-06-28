import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ChangeSet } from './change-set.model';
import { ChangeSetService } from './change-set.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-change-set',
    templateUrl: './change-set.component.html'
})
export class ChangeSetComponent implements OnInit, OnDestroy {
changeSets: ChangeSet[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private changeSetService: ChangeSetService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.changeSetService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<ChangeSet[]>) => this.changeSets = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.changeSetService.query().subscribe(
            (res: HttpResponse<ChangeSet[]>) => {
                this.changeSets = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInChangeSets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ChangeSet) {
        return item.id;
    }
    registerChangeInChangeSets() {
        this.eventSubscriber = this.eventManager.subscribe('changeSetListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
