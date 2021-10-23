import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/_services/alert.service';
import { StudentService } from 'src/app/_services/student/student.service';

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
  roles: any;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private studentService: StudentService,
    private dialogRef: MatDialogRef<UsersEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title ='';
    this.roles=[{id:1, name:'role1'}];

    if (this.data.isEdit === false) {
      this.title = 'Create New User';
      this.uid = '';
      this.username = '';
    }
    else {
      this.title = 'Edit User';
      this.uid = this.data.user.uid;
      this.username = this.data.user.username;
    }
   }

  ngOnInit() {
    this.form = this.fb.group({
      sid: ['', []],
      username: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      password: ['password', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      roleid: [null, [Validators.required]]
      });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    let user = {
      uid: this.uid,
      username : this.username,
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
