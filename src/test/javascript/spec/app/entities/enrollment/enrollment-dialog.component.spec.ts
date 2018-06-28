/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PatientManegementTaskTestModule } from '../../../test.module';
import { EnrollmentDialogComponent } from '../../../../../../main/webapp/app/entities/enrollment/enrollment-dialog.component';
import { EnrollmentService } from '../../../../../../main/webapp/app/entities/enrollment/enrollment.service';
import { Enrollment } from '../../../../../../main/webapp/app/entities/enrollment/enrollment.model';
import { PatientService } from '../../../../../../main/webapp/app/entities/patient';

describe('Component Tests', () => {

    describe('Enrollment Management Dialog Component', () => {
        let comp: EnrollmentDialogComponent;
        let fixture: ComponentFixture<EnrollmentDialogComponent>;
        let service: EnrollmentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PatientManegementTaskTestModule],
                declarations: [EnrollmentDialogComponent],
                providers: [
                    PatientService,
                    EnrollmentService
                ]
            })
            .overrideTemplate(EnrollmentDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnrollmentDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnrollmentService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Enrollment(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.enrollment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enrollmentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Enrollment();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.enrollment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enrollmentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
