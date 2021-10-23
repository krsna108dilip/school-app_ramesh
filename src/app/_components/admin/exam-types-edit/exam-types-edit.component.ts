import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { constants } from 'fs';
import { AlertService } from 'src/app/_services/alert.service';
import { StudentService } from 'src/app/_services/student/student.service';
import { UsersEditComponent } from '../users-edit/users-edit.component';

@Component({
  selector: 'app-exam-types-edit',
  templateUrl: './exam-types-edit.component.html',
  styleUrls: ['./exam-types-edit.component.scss']
})
export class ExamTypesEditComponent implements OnInit {


  form: FormGroup;
  etid: string;
  etname: string;
  type: string;
  title: string;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private studentService: StudentService,
    private dialogRef: MatDialogRef<ExamTypesEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    // this.type = this.data.type;
    // this.title = this.data.title;
    // this.isEdit = this.data.isEdit;

    if (this.data.isEdit === false) {
      this.title = 'Create New Exam Type'
      this.etid = '';
      this.etname = '';
    } else {
      this.title = 'Edit Exam Type'
      this.etid = this.data.examtype.etid;
      this.etname = this.data.examtype.etname;
    }
   }

  ngOnInit() {
    this.form = this.fb.group({
      etid: ['', []],
      etname: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
      });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    const examtype = {
      etid: this.etid,
      etname : this.etname,
    };

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
