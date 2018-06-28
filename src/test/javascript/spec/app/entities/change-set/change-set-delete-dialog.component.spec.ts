/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PatientManegementTaskTestModule } from '../../../test.module';
import { ChangeSetDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/change-set/change-set-delete-dialog.component';
import { ChangeSetService } from '../../../../../../main/webapp/app/entities/change-set/change-set.service';

describe('Component Tests', () => {

    describe('ChangeSet Management Delete Component', () => {
        let comp: ChangeSetDeleteDialogComponent;
        let fixture: ComponentFixture<ChangeSetDeleteDialogComponent>;
        let service: ChangeSetService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PatientManegementTaskTestModule],
                declarations: [ChangeSetDeleteDialogComponent],
                providers: [
                    ChangeSetService
                ]
            })
            .overrideTemplate(ChangeSetDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChangeSetDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChangeSetService);
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
