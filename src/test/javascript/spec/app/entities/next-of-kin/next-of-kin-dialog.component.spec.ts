/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PatientManegementTaskTestModule } from '../../../test.module';
import { NextOfKinDialogComponent } from '../../../../../../main/webapp/app/entities/next-of-kin/next-of-kin-dialog.component';
import { NextOfKinService } from '../../../../../../main/webapp/app/entities/next-of-kin/next-of-kin.service';
import { NextOfKin } from '../../../../../../main/webapp/app/entities/next-of-kin/next-of-kin.model';

describe('Component Tests', () => {

    describe('NextOfKin Management Dialog Component', () => {
        let comp: NextOfKinDialogComponent;
        let fixture: ComponentFixture<NextOfKinDialogComponent>;
        let service: NextOfKinService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PatientManegementTaskTestModule],
                declarations: [NextOfKinDialogComponent],
                providers: [
                    NextOfKinService
                ]
            })
            .overrideTemplate(NextOfKinDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NextOfKinDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NextOfKinService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new NextOfKin(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.nextOfKin = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'nextOfKinListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new NextOfKin();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.nextOfKin = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'nextOfKinListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
