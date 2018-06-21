import { Component, OnInit } from '@angular/core';
declare var AdminLTE: any;
@Component({
  selector: 'app-report-summary',
  templateUrl: './patient-report.component.html',
  styleUrls: ['./patient-report.component.css']
})
export class ReportSummaryComponent implements OnInit {
  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];


  constructor() {
  }

  public ngOnInit() {
    AdminLTE.init();
    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');

  }
}
