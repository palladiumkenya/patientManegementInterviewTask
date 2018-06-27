/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PatientManegementTaskTestModule } from '../../../test.module';
import { NextOfKinDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/next-of-kin/next-of-kin-delete-dialog.component';
import { NextOfKinService } from '../../../../../../main/webapp/app/entities/next-of-kin/next-of-kin.service';

describe('Component Tests', () => {

    describe('NextOfKin Management Delete Component', () => {
        let comp: NextOfKinDeleteDialogComponent;
        let fixture: ComponentFixture<NextOfKinDeleteDialogComponent>;
        let service: NextOfKinService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PatientManegementTaskTestModule],
                declarations: [NextOfKinDeleteDialogComponent],
                providers: [
                    NextOfKinService
                ]
            })
            .overrideTemplate(NextOfKinDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NextOfKinDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NextOfKinService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
