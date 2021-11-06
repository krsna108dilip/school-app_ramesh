import { Users } from '../../../_models/admin/Users';
import { UsersEditComponent } from './../users-edit/users-edit.component';
import { AdminService } from 'src/app/_services/admin/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayColumns: string[] = ['actions', 'id', 'username', 'role'];
  dataSource = new MatTableDataSource<Users>([]);

  @ViewChild(MatPaginator, {static: true} ) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    ) {
   }

  ngOnInit() {
  this.getUsers();
  }

  getUsers() {
    this.adminService.GetAllUsers().subscribe(res => {
      console.log(res);

    this.dataSource.data = res;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    });

  }

addNewUser() {
  let editDialog;

  const dialogConfig = new MatDialogConfig();

  editDialog = this.dialog.open(UsersEditComponent, {
          // height: '800px',
          // width: '600px',
          data: {
            isEdit: false,
            user: {uid: 1, username: 'Testing'}
              }
            }
  );
  editDialog.disableClose = true;

  editDialog.afterClosed().subscribe(result => {
    this.getUsers();
  });
}

  openEditUser(event, userObj: any): void {
    let editDialog;
    const dialogConfig = new MatDialogConfig();
    editDialog = this.dialog.open(UsersEditComponent, {
            // height: '800px',
            // width: '600px',
            data: {
              isEdit: true,
              user: {uid: userObj.id, username: userObj.username, role: userObj.role}
                }
              }
    );
    editDialog.disableClose = true;

    editDialog.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

}
