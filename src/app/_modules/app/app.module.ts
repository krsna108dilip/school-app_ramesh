import { StandardsComponent } from './../../_components/admin/standards/standards.component';
import { ApproveMarksComponent } from './../../_components/admin/approve-marks/approve-marks.component';
import { UsersComponent } from './../../_components/admin/users/users.component';
import { BulkQrCodeGeneratorComponent } from './../../_components/admin/bulk-qr-code-generator/bulk-qr-code-generator.component';
import { GenerateRankByStandardComponent } from './../../_components/admin/generate-rank-by-standard/generate-rank-by-standard.component';
import { BulkUploadComponent } from './../../_components/qr-code/bulk-upload/bulk-upload.component';
import { OpenScannerComponent } from './../../_components/qr-code/open-scanner/open-scanner.component';
import { DummyPageComponent } from './../../_components/dummy-page/dummy-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../routing/app-routing.module';
import { AppComponent } from '../../_components/app/app.component';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from 'src/app/_components/login/login.component';
import { RegisterComponent } from 'src/app/_components/register/register.component';
import { HomeComponent } from 'src/app/_components/home/home.component';
import { NavMenuComponent } from 'src/app/_components/nav-menu/nav-menu.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ConfirmDialogComponent } from 'src/app/_components/confirm-dialog/confirm-dialog.component';
import { StudentSearchResultComponent } from 'src/app/_components/student-search-result/student-search-result.component';
import { ClasswiseResultComponent } from 'src/app/_components/classwise-result/classwise-result.component';
import { JwtInterceptor } from 'src/app/_helpers/JwtInterceptor';
import { ErrorInterceptor } from 'src/app/_helpers/ErrorInterceptor';
import { ClasswiseResultEditComponent } from 'src/app/_components/classwise-result-edit/classwise-result-edit.component';
import { MatDialogRef } from '@angular/material';
import { StudentService } from 'src/app/_services/student/student.service';
// import { GoogleChartsModule,ScriptLoaderService } from 'angular-google-charts';
import { StudentMarksReportComponent } from 'src/app/_components/student-marks-report/student-marks-report.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { ExamTypesComponent } from 'src/app/_components/admin/exam-types/exam-types.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavMenuComponent,
    ConfirmDialogComponent,
    StudentSearchResultComponent,
    ClasswiseResultComponent,
    ClasswiseResultEditComponent,
    StudentMarksReportComponent,
    DummyPageComponent,
    OpenScannerComponent,
    BulkUploadComponent,
    GenerateRankByStandardComponent,
    BulkQrCodeGeneratorComponent,
    UsersComponent,
    ApproveMarksComponent,
    ExamTypesComponent,
    StandardsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    NgxChartsModule,
   //GoogleChartsModule.forRoot(),

  ],
  providers: [AuthenticationService, AlertService, StudentService,

    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    //ScriptLoaderService



  ],
  entryComponents: [ ConfirmDialogComponent, ClasswiseResultEditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

// fakeBackendProvider,
