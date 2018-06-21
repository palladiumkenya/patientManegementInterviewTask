
import { StarterComponent } from './../starter/starter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientSearchComponent } from '../patient-search/patient-search.component';
import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { CreatePatientComponent } from '../create-patient/create-patient.component';
import { PatientListComponent } from '../patient-list.component';
import { ReportSummaryComponent } from '../repoorts/patient-report.component';

export const routes = [

  {
    path: 'starter',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'starter'
      },
      { path: '', component: StarterComponent },
    ]
  },
  {path: 'patient-infor', component: PatientInfoComponent},
  {
    path: 'create-patient',
    children: [
      {path: '', component: CreatePatientComponent}
    ]
  },
  {
    path: 'patient-list-cohort',
    children: [
      {path: '', component: PatientListComponent}
    ]
  },
  {
    path: 'app-report-summary',
    children: [
      {path: '', component: ReportSummaryComponent}
    ]
  }
  //
];
