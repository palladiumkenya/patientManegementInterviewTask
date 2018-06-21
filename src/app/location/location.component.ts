import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { ActivatedRoute } from '@angular/router';
import { PatientResourceService } from '../patient-resource.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
public location: any;
public  id: number;
  private sub: any;
  constructor(private patientService: PatientService,
              private route: ActivatedRoute,
              private patientResourceService: PatientResourceService) { }

  ngOnInit() {
    /*this.sub = this.route.params.subscribe(params => {
      console.log('params====', params);
      this.patientResourceService.getPatientById(params.person_id).subscribe(
        (res) => {
          this.location = res;

        }
      );
    });*/
    this.getLoadedPatient();
  }
  public getLoadedPatient() {
    this.patientService.getloadepatient().subscribe((data) => {
        this.location = data;
      });
  }

}
