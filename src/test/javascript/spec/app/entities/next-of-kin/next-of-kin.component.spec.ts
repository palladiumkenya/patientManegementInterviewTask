/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatientManegementTaskTestModule } from '../../../test.module';
import { NextOfKinComponent } from '../../../../../../main/webapp/app/entities/next-of-kin/next-of-kin.component';
import { NextOfKinService } from '../../../../../../main/webapp/app/entities/next-of-kin/next-of-kin.service';
import { NextOfKin } from '../../../../../../main/webapp/app/entities/next-of-kin/next-of-kin.model';

describe('Component Tests', () => {

    describe('NextOfKin Management Component', () => {
        let comp: NextOfKinComponent;
        let fixture: ComponentFixture<NextOfKinComponent>;
        let service: NextOfKinService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PatientManegementTaskTestModule],
                declarations: [NextOfKinComponent],
                providers: [
                    NextOfKinService
                ]
            })
            .overrideTemplate(NextOfKinComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NextOfKinComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NextOfKinService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new NextOfKin(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.nextOfKins[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
