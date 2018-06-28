/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PatientManegementTaskTestModule } from '../../../test.module';
import { ChangeSetDetailComponent } from '../../../../../../main/webapp/app/entities/change-set/change-set-detail.component';
import { ChangeSetService } from '../../../../../../main/webapp/app/entities/change-set/change-set.service';
import { ChangeSet } from '../../../../../../main/webapp/app/entities/change-set/change-set.model';

describe('Component Tests', () => {

    describe('ChangeSet Management Detail Component', () => {
        let comp: ChangeSetDetailComponent;
        let fixture: ComponentFixture<ChangeSetDetailComponent>;
        let service: ChangeSetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PatientManegementTaskTestModule],
                declarations: [ChangeSetDetailComponent],
                providers: [
                    ChangeSetService
                ]
            })
            .overrideTemplate(ChangeSetDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChangeSetDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChangeSetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ChangeSet(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.changeSet).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
