import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { PatientService } from '../patient.service';
import {PatientResourceService} from '../patient-resource.service';
import {BsModalComponent} from 'ng2-bs3-modal';
declare var AdminLTE: any;

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.css']
})
export class PatientSearchComponent implements OnInit {
  @ViewChild('myModal')
  modal: BsModalComponent;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  public patients: any[];
  public searchString: string;
  public display: boolean = false;
  public isLoading: boolean = false;
  public isResetButton: boolean = false;
  public adjustInputMargin: string = '240px';
  public totalPatients: number;
  public hasConductedSearch: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private patientService: PatientService,
  private patientResourceService: PatientResourceService) { }

  ngOnInit() {
    AdminLTE.init();
  }
  public searchPatient() {
    if (this.searchString && this.searchString.length > 2) {
      if (window.innerWidth > 768) {
        this.adjustInputMargin = '267px';
      }
    }
    this.isLoading = true;
    this.patientResourceService.searchPatient(this.searchString.trim())
      .subscribe(
        (patients) => {
          this.patients = patients;
          this.totalPatients = this.patients.length;
          this.hasConductedSearch = true;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error', error);

        }
      );
    this.isResetButton = true;
  }

  public resetSearchList() {
    this.patients = [];
    this.searchString = '';
    this.resetInputMargin();
  }
  selectPatient(patient) {
    this.patientService.setLoadedPatient(patient);
    this.router.navigate(['patient-infor']);
  }
  showDialog() {
    this.display = true;
  }
  public resetInputMargin() {
    if (window.innerWidth > 768) {
      this.adjustInputMargin = '240px';
    }
  }



}
