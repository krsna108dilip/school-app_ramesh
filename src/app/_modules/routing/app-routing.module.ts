import { BulkUploadComponent } from './../../_components/qr-code/bulk-upload/bulk-upload.component';
import { OpenScannerComponent } from './../../_components/qr-code/open-scanner/open-scanner.component';
import { BulkQrCodeGeneratorComponent } from './../../_components/admin/bulk-qr-code-generator/bulk-qr-code-generator.component';
import { UsersComponent } from './../../_components/admin/users/users.component';
import { ApproveMarksComponent } from './../../_components/admin/approve-marks/approve-marks.component';
import { StandardsComponent } from './../../_components/admin/standards/standards.component';
import { GenerateRankByStandardComponent } from './../../_components/admin/generate-rank-by-standard/generate-rank-by-standard.component';
import { DummyPageComponent } from './../../_components/dummy-page/dummy-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClasswiseResultComponent } from 'src/app/_components/classwise-result/classwise-result.component';
import { HomeComponent } from 'src/app/_components/home/home.component';
import { LoginComponent } from 'src/app/_components/login/login.component';
import { RegisterComponent } from 'src/app/_components/register/register.component';
import { StudentMarksReportComponent } from 'src/app/_components/student-marks-report/student-marks-report.component';
import { StudentSearchResultComponent } from 'src/app/_components/student-search-result/student-search-result.component';
import { AuthGuard } from 'src/app/_helpers/AuthGuard';
import { ExamTypesComponent } from 'src/app/_components/admin/exam-types/exam-types.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'dummy', component: DummyPageComponent},
  {path: 'studentsearchresult', component: StudentSearchResultComponent},
  {path: 'classwiseresult', component: ClasswiseResultComponent },
  //, canActivate: [AuthGuard], data:{ roles:['ROLE_ADMIN','TechAdmin']} },
  {path: 'studentmarksreport', component: StudentMarksReportComponent },

  // QR Code
  {path: 'openscanner', component: OpenScannerComponent  },
  {path: 'bulkupload', component: BulkUploadComponent  },


  // admin menus
  {path: 'generaterankbystandandard', component: GenerateRankByStandardComponent },
  {path: 'bulkqrcodegenerator', component: BulkQrCodeGeneratorComponent },
  {path: 'users', component: UsersComponent },
  {path: 'approvemarks', component: ApproveMarksComponent },
  {path: 'examtypes', component: ExamTypesComponent },
  {path: 'standards', component: StandardsComponent },





  {path: '**', redirectTo: 'login'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
