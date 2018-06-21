import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditNextOfKinComponent } from './edit-next-of-kin.component';



describe('EditNextOfKinComponent', () => {
  let component: EditNextOfKinComponent;
  let fixture: ComponentFixture<EditNextOfKinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNextOfKinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNextOfKinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
