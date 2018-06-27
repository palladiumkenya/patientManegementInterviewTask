/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PatientManegementTaskTestModule } from '../../../test.module';
import { NextOfKinDetailComponent } from '../../../../../../main/webapp/app/entities/next-of-kin/next-of-kin-detail.component';
import { NextOfKinService } from '../../../../../../main/webapp/app/entities/next-of-kin/next-of-kin.service';
import { NextOfKin } from '../../../../../../main/webapp/app/entities/next-of-kin/next-of-kin.model';

describe('Component Tests', () => {

    describe('NextOfKin Management Detail Component', () => {
        let comp: NextOfKinDetailComponent;
        let fixture: ComponentFixture<NextOfKinDetailComponent>;
        let service: NextOfKinService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PatientManegementTaskTestModule],
                declarations: [NextOfKinDetailComponent],
                providers: [
                    NextOfKinService
                ]
            })
            .overrideTemplate(NextOfKinDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NextOfKinDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NextOfKinService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new NextOfKin(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.nextOfKin).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
