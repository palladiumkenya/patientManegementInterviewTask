import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Enrollment } from './enrollment.model';
import { EnrollmentService } from './enrollment.service';

@Component({
    selector: 'jhi-enrollment-detail',
    templateUrl: './enrollment-detail.component.html'
})
export class EnrollmentDetailComponent implements OnInit, OnDestroy {

    enrollment: Enrollment;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private enrollmentService: EnrollmentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEnrollments();
    }

    load(id) {
        this.enrollmentService.find(id)
            .subscribe((enrollmentResponse: HttpResponse<Enrollment>) => {
                this.enrollment = enrollmentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEnrollments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'enrollmentListModification',
            (response) => this.load(this.enrollment.id)
        );
    }
}
