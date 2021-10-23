import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from 'src/app/_services/alert.service';
import { StudentService } from 'src/app/_services/student/student.service';
import { UsersEditComponent } from '../users-edit/users-edit.component';

@Component({
  selector: 'app-standards-edit',
  templateUrl: './standards-edit.component.html',
  styleUrls: ['./standards-edit.component.scss']
})
export class StandardsEditComponent implements OnInit {

  form: FormGroup;
  sid: string;
  sname: string;
  type: string;
  title: string;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private studentService: StudentService,
    private dialogRef: MatDialogRef<StandardsEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    // this.type = this.data.type;

    if (this.data.isEdit === false) {
      this.title = 'Create New Standard';
      this.sid = '';
      this.sname = '';
    }
    else {
      this.title = 'Edit Standard';
      this.sid = this.data.standard.sid;
      this.sname = this.data.standard.sname;
    }
   }

  ngOnInit() {
    this.form = this.fb.group({
      sid: ['', []],
      sname: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
      });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    let standard = {
      sid: this.sid,
      sname : this.sname,
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
