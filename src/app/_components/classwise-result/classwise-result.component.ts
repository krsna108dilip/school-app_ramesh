import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA  } from '@angular/material';
import { Router } from '@angular/router';
import { Standards } from 'src/app/_models/Standards';
import { Examtypes } from 'src/app/_models/examtypes';
import { StudentResult } from 'src/app/_models/StudentResult';
import { AlertService } from 'src/app/_services/alert.service';
import { ClasswiseResultEditComponent } from '../classwise-result-edit/classwise-result-edit.component';
import { StudentService } from 'src/app/_services/student/student.service';
import { catchError, first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { SchoolConstant } from 'src/app/_helpers/SchoolConstant';


@Component({
  selector: 'app-classwise-result',
  templateUrl: './classwise-result.component.html',
  styleUrls: ['./classwise-result.component.scss']
})
export class ClasswiseResultComponent implements OnInit {

  //dataSource: Studentsearchresult[];
  loading: boolean = false;
  submit: boolean = false;
  cwrForm: FormGroup;
  standards: Standards[];
  examtypes: Examtypes[];
  selection = new SelectionModel<StudentResult>(true, []);
  dataSource = new MatTableDataSource<StudentResult>([]);
  hasData: boolean = false;
  student:any;
  id:string;
  sid: string;
  sname: string;
  classsec: string;
  telugu: number;
  hindi: number;
  english: number;
  maths: number;
  science: number;
  social: number;
  examtype:string;
  auth:SchoolConstant;
  isAdmin:boolean = false;

  displayColumns: string[] = ['actions' ,'id', 'sid', 'sname', 'classsection', 'telugu', 'hindi',
'english', 'maths', 'science', 'social', 'examtype'];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private studentService: StudentService,
    private authService: AuthenticationService
    ) {

     }

  @ViewChild(MatPaginator, {static: true} ) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.cwrForm = this.formBuilder.group({
      standardId: ['', [Validators.required]],
      examTypeId: ['', [Validators.required]],
    });

    this.authService.currentAuthSubject.subscribe(auth => {
      if(auth != null){
        this.auth = auth;
        this.isAdmin= auth.isAdmin;
        
      }}
    );
    console.log('auth' + this.isAdmin);

    this.getStandards();
    this.getExamTypes();

    this.dataSource.data = null;
    this.dataSource.sort = null;
    this.dataSource.paginator= null;

  }

  getStandards() {
    this.studentService.getAllStandards().subscribe(res => {
      this.standards = res;
    });

  }

  getExamTypes() {

    this.studentService.getAllExamTypes().subscribe(res => {
      this.examtypes = res;
    });
  }

//   getData() {
// const res = this.studentService.getStudentResultByStandard();

// if(res.length > 0){
//   this.hasData = true;

//  //this.dataSource = new MatTableDataSource();
//  this.dataSource.data = res;
//  this.dataSource.sort = this.sort;
//  this.dataSource.paginator=this.paginator;
// }
// else
// this.hasData = false;
// }






  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
    console.log(this.selection.selected);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
        console.log(this.selection.selected);
  }

  TestCheck(){
    console.log(this.selection.selected);
  }

  toggleCheckbox(row) {
    this.selection.toggle(row);
    row.selected = !row.selected;
    console.log(this.selection.selected);
  }

  openEditDialog(event, schoolObj: StudentResult): void {
    console.log('test edit');

    let editDialog;

    const dialogConfig = new MatDialogConfig();


    //console.log(schoolObj);
    
     this.studentService.getStudentMarksById(schoolObj.id.toString()).subscribe(
       res => {

         editDialog = this.dialog.open(ClasswiseResultEditComponent, {
          // height: '800px',
          // width: '600px',
          data: {
            student: res
              }
        }); 
        editDialog.disableClose = true;

        editDialog.afterClosed().subscribe(result => {
        this.getData(this.cwrForm.controls.standardId.value,
         this.cwrForm.controls.examTypeId.value);

         });
       },
       catchError( err => {
         throw err;
       })
     );
        


    
  }


  onSubmit() {
    this.submit = true;

    if (this.cwrForm.invalid)
      return;

      this.loading = true;

      let standardId = this.cwrForm.controls.standardId.value;
      let examTypeId = this.cwrForm.controls.examTypeId.value;


      console.log(standardId);
      console.log(examTypeId);

      this.getData(standardId,examTypeId);
      this.submit = false;

      this.studentService.getStudentMarksById("1").subscribe(
        res => {
          console.log('res for student id'+ res);
        }
      );

  }

  getData(standardId: string, examTypeId: string)
  {
    this.studentService.getStudentResultByStandard(standardId, examTypeId).subscribe(
      res => {
          this.dataSource.data = res;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator=this.paginator;
          this.loading = false;
      }
    );
  }

}

