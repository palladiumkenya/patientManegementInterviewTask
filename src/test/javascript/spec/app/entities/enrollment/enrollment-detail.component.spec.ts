/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PatientManegementTaskTestModule } from '../../../test.module';
import { EnrollmentDetailComponent } from '../../../../../../main/webapp/app/entities/enrollment/enrollment-detail.component';
import { EnrollmentService } from '../../../../../../main/webapp/app/entities/enrollment/enrollment.service';
import { Enrollment } from '../../../../../../main/webapp/app/entities/enrollment/enrollment.model';

describe('Component Tests', () => {

    describe('Enrollment Management Detail Component', () => {
        let comp: EnrollmentDetailComponent;
        let fixture: ComponentFixture<EnrollmentDetailComponent>;
        let service: EnrollmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PatientManegementTaskTestModule],
                declarations: [EnrollmentDetailComponent],
                providers: [
                    EnrollmentService
                ]
            })
            .overrideTemplate(EnrollmentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnrollmentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnrollmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Enrollment(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.enrollment).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
