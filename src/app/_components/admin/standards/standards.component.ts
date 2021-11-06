import { Standard } from './../../../_models/admin/Standard';
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

  displayColumns: string[] = ['actions', 'id', 'standardname'];
  dataSource = new MatTableDataSource<Standard>([]);

  @ViewChild(MatPaginator, {static: true} ) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    ) {
   }

  ngOnInit() {
  this.getAllStandards();
  }

  getAllStandards() {
    this.adminService.GetAllStandards().subscribe(res => {
      console.log(res);
    this.dataSource.data = res;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    });
  }

addNewStandard() {
  let editDialog;
  const dialogConfig = new MatDialogConfig();
  editDialog = this.dialog.open(StandardsEditComponent, {
          // height: '800px',
          // width: '600px',
          data: {
            isEdit: false,
            standard: {}
              }
            }
  );
  editDialog.disableClose = true;

  editDialog.afterClosed().subscribe(result => {
    this.getAllStandards();
  });
}
  openEditStandard(event, standardObj: any): void {
    let editDialog;
    const dialogConfig = new MatDialogConfig();
    editDialog = this.dialog.open(StandardsEditComponent, {
            // height: '800px',
            // width: '600px',
            data: {
              isEdit: true,
              standard: {sid: standardObj.id, sname: standardObj.standardname}
                }
              }
    );
    editDialog.disableClose = true;
    editDialog.afterClosed().subscribe(result => {
      this.getAllStandards();
    });

  }
}
