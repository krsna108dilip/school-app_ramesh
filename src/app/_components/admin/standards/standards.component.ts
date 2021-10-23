import { StandardsEditComponent } from './../standards-edit/standards-edit.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/_services/admin/admin.service';

@Component({
  selector: 'app-standards',
  templateUrl: './standards.component.html',
  styleUrls: ['./standards.component.scss']
})
export class StandardsComponent implements OnInit {

  displayColumns: string[] = ['actions', 'sid', 'sname'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, {static: true} ) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    ) {

   }



  ngOnInit() {
    this.dataSource.data = [{sid: 1, sname: 'Testing'}];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

addNewStandard() {
  let editDialog;

  const dialogConfig = new MatDialogConfig();

  editDialog = this.dialog.open(StandardsEditComponent, {
          // height: '800px',
          // width: '600px',
          data: {
            isEdit: false,
            standard: {sid: 1, sname: 'Testing'}
              }
            }
  );
  editDialog.disableClose = true;
}
  openEditStandard(event, standardObj: any): void {


    let editDialog;

    const dialogConfig = new MatDialogConfig();

    editDialog = this.dialog.open(StandardsEditComponent, {
            // height: '800px',
            // width: '600px',
            data: {
              isEdit: true,
              standard: {sid: 1, sname: 'Testing'}
                }
              }
    );
    editDialog.disableClose = true;


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
