import { catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/_services/admin/admin.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/_services/alert.service';
import { StudentService } from 'src/app/_services/student/student.service';
import { Role } from 'src/app/_models/Role';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  form: FormGroup;
  uid: string;
  username: string;
  type: string;
  title: string;
  roles: Role[];
  role: string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private adminService: AdminService,
    private dialogRef: MatDialogRef<UsersEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title ='';
    //this.roles = [{id: 1, name: 'role1'}];
    //this.roles = [];


    if (this.data.isEdit === false) {
      this.title = 'Create New User';
      this.uid = '';
      this.username = '';
      this.role ='';
    }
    else {
      this.title = 'Edit User';
      this.uid = this.data.user.uid;
      this.username = this.data.user.username;
      this.role = this.data.user.role;
      console.log(this.role);
    }
   }

  ngOnInit() {
    this.form = this.fb.group({
      uid: ['', []],
      username: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      password: ['password', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      roleid: [this.role, [Validators.required]]
      });

      this.adminService.GetUserRoles().subscribe(res => {
        this.roles = res;
      });

      this.form.setValue({
        uid: this.uid,
        username:this.username,
        password:'password',
        roleid: this.role,
      });

  }

  get f() { return this.form.controls; }

  onSubmit() {

    //this.submitted = true;

    if (this.form.invalid) {
    return;
    }

    this.loading = true;

    //this.loading = true;


    if (this.data.isEdit === true) {

      const updateUser = {
        id: this.uid,
        username : this.f.username.value,
        password: this.f.password.value,
        role: this.f.roleid.value
      };

      this.adminService.EditUser(updateUser).subscribe(res => {
        //if (res.status === 200) {
          this.alertService.Success('User updated successfully');
          this.loading = false;
          this.close();
        //}

      },error =>{
        this.loading = false;
        throw error;
      }
      );




    } else {
      const addUser = {
        id: this.uid,
        username : this.f.username.value,
        password: this.f.password.value,
        role: this.f.roleid.value
      };

      this.adminService.AddNewUser(addUser).subscribe(res => {
        //if (res.status === 200) {
          this.alertService.Success('New user added successfully');
          this.loading = false;
          this.close();
        //}

      },error =>{
        this.loading = false;
        throw error;
      }
      );




    }

    // this.studentService.studentMarksUpdate(user).subscribe(res => {


    //   this.dialogRef.close();
    //   this.alertService.Success('Marks are updated');
    // });

    //this.dialogRef.close({data: {firstlang:this.f.firstlang.value, sid:this.f.sid.value}});
    }

    close() {
        this.dialogRef.close();
    }

}
