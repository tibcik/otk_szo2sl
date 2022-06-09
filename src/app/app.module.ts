import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientListComponent } from './patient-list/patient-list.component';

import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TajFormaterPipe } from './taj-formater.pipe';
import { GenderFormaterPipe } from './gender-formater.pipe';
import { PatientComponent } from './patient/patient.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { DiagnosisFormComponent } from './diagnosis-form/diagnosis-form.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { TestListComponent } from './test-list/test-list.component';
import { TestFormComponent } from './test-form/test-form.component';
import { TestComponent } from './test/test.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    TajFormaterPipe,
    GenderFormaterPipe,
    PatientComponent,
    DiagnosisComponent,
    DiagnosisFormComponent,
    PatientFormComponent,
    TestListComponent,
    TestFormComponent,
    TestComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
