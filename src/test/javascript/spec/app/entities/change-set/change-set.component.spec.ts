/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatientManegementTaskTestModule } from '../../../test.module';
import { ChangeSetComponent } from '../../../../../../main/webapp/app/entities/change-set/change-set.component';
import { ChangeSetService } from '../../../../../../main/webapp/app/entities/change-set/change-set.service';
import { ChangeSet } from '../../../../../../main/webapp/app/entities/change-set/change-set.model';

describe('Component Tests', () => {

    describe('ChangeSet Management Component', () => {
        let comp: ChangeSetComponent;
        let fixture: ComponentFixture<ChangeSetComponent>;
        let service: ChangeSetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PatientManegementTaskTestModule],
                declarations: [ChangeSetComponent],
                providers: [
                    ChangeSetService
                ]
            })
            .overrideTemplate(ChangeSetComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChangeSetComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChangeSetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ChangeSet(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.changeSets[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
