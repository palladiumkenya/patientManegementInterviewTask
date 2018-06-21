import { routes } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';



import { AppComponent } from './app.component';
import { StarterComponent } from './starter/starter.component';
import { StarterHeaderComponent } from './starter/starter-header/starter-header.component';
import { StarterLeftSideComponent } from './starter/starter-left-side/starter-left-side.component';
import { StarterContentComponent } from './starter/starter-content/starter-content.component';
import { StarterFooterComponent } from './starter/starter-footer/starter-footer.component';
import { StarterControlSidebarComponent } from './starter/starter-control-sidebar/starter-control-sidebar.component';
import { PatientResourceService } from './patient-resource.service';
import { ConfirmationService } from 'primeng/api';
import { PatientService } from './patient.service';
import {
  AccordionModule, CalendarModule, ConfirmDialogModule, DataTableModule,
  DropdownModule, InputTextareaModule, InputTextModule,
  MessagesModule,
  TabViewModule
} from 'primeng/primeng';
import {SharedModule} from 'primeng/shared';
import {GrowlModule} from 'primeng/growl';
import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import { PatientSearchComponent } from './patient-search/patient-search.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { ContactsComponent } from './contacts/contacts.component';
import { EditContactsComponent } from './contacts/edit-contacts/edit-contacts.component';
import { LocationComponent } from './location/location.component';
import { EditLocationComponent } from './location/edit-location/edit-location.component';
import { PatientDemographicsComponent } from './patient-demographics/patient-demographics.component';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { EditDemographicsComponent } from './patient-demographics/edit-demographics/edit-demographics.component';
import { DisplayErrorComponent } from './display-error/display-error.component';
import { PatientListComponent } from './patient-list.component';
import { ReportSummaryComponent } from './repoorts/patient-report.component';
import { DeletedPatientComponent } from './repoorts/deleted-patient-list.component';
import { PatientByAgeCohortComponent } from './repoorts/patient-by-age-cohort.component';
import { NouisliderModule } from 'ng2-nouislider';
import { EditNextOfKinComponent } from './next-kin/edit-next-kin/edit-next-of-kin.component';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AccordionModule, DataTableModule, SharedModule, TabViewModule,
    GrowlModule, PanelModule, ConfirmDialogModule,
    DialogModule, InputTextModule, MessagesModule, InputTextareaModule,
    DropdownModule, ButtonModule, CalendarModule, NouisliderModule,
    RouterModule.forRoot(routes)
  ],
  exports: [],
  declarations: [
    AppComponent,
    StarterComponent,
    StarterHeaderComponent,
    StarterLeftSideComponent,
    StarterContentComponent,
    StarterFooterComponent,
    StarterControlSidebarComponent,
    PatientSearchComponent,
    ContactsComponent,
    EditContactsComponent,
    LocationComponent,
    EditLocationComponent,
    PatientDemographicsComponent,
    CreatePatientComponent,
    PatientInfoComponent,
    EditDemographicsComponent,
    DisplayErrorComponent,
    PatientListComponent,
    ReportSummaryComponent,
    DeletedPatientComponent,
    PatientByAgeCohortComponent,
    EditNextOfKinComponent
  ],
  providers: [PatientResourceService, ConfirmationService,
    PatientService],
  bootstrap: [AppComponent]
})
export class AppModule {
  public static routes = routes;
}
