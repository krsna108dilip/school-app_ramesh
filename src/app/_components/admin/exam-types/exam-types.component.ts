import { ExamType } from './../../../_models/admin/ExamType';
import { ExamTypesEditComponent } from './../exam-types-edit/exam-types-edit.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/_services/admin/admin.service';

@Component({
  selector: 'app-exam-types',
  templateUrl: './exam-types.component.html',
  styleUrls: ['./exam-types.component.scss']
})
export class ExamTypesComponent implements OnInit {

  displayColumns: string[] = ['actions', 'id', 'examtypename'];
  dataSource = new MatTableDataSource<ExamType>([]);

  @ViewChild(MatPaginator, {static: true} ) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    ) {

   }

  ngOnInit() {
    this.getExamTypes();
  }

  getExamTypes() {
    this.adminService.GetAllExamTypes().subscribe(res =>{
      this.dataSource.data = res;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    });

  }

addNewExamType() {
  let editDialog;

  const dialogConfig = new MatDialogConfig();

  editDialog = this.dialog.open(ExamTypesEditComponent, {
          // height: '800px',
          // width: '600px',
          data: {
            isEdit: false,
            examtype: {}
              }
            }
  );
  editDialog.disableClose = true;

  editDialog.afterClosed().subscribe(result => {
    this.getExamTypes();
  });
}

  openEditExamType(event, examtypeObj: any): void {


    let editDialog;

    const dialogConfig = new MatDialogConfig();

    editDialog = this.dialog.open(ExamTypesEditComponent, {
            // height: '800px',
            // width: '600px',
            data: {
              isEdit: true,
              examtype: {etid: examtypeObj.id, etname: examtypeObj.examtypename}
                }
              }
    );
    editDialog.disableClose = true;

    editDialog.afterClosed().subscribe(result => {
      this.getExamTypes();
    });


    // //console.log(schoolObj);

    //  this.adminService.getStudentMarksById(schoolObj.id.toString()).subscribe(
    //    res => {

    //      editDialog = this.dialog.open(ClasswiseResultEditComponent, {
    //       // height: '800px',
    //       // width: '600px',
    //       data: {
    //         student: res
    //           }
    //     });
    //     editDialog.disableClose = true;

    //     editDialog.afterClosed().subscribe(result => {
    //     this.getData(this.cwrForm.controls.standardId.value,
    //      this.cwrForm.controls.examTypeId.value);

    //      });
    //    },
    //    catchError( err => {
    //      throw err;
    //    })
    //  );
  }
}
