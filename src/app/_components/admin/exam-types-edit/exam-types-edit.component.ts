import { AdminService } from 'src/app/_services/admin/admin.service';
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

 loading = false;
  form: FormGroup;
  etid: string;
  etname: string;
  type: string;
  title: string;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private adminService: AdminService,
    private dialogRef: MatDialogRef<ExamTypesEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    // this.type = this.data.type;
    // this.title = this.data.title;
    // this.isEdit = this.data.isEdit;

    if (this.data.isEdit === false) {
      this.title = 'Create New Exam Type';
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

      this.form.setValue({
        etid: this.etid,
        etname:this.etname
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

        const examtype = {
          id: this.etid,
          examtypename : this.f.etname.value,
        };

        this.adminService.EditExamType(examtype).subscribe(res => {
          //if (res.status === 200) {
            this.alertService.Success('Examtype updated successfully');
            this.loading = false;
            this.close();
          //}

        },error =>{
          this.loading = false;
          throw error;
        }
        );

      } else {
        const examtype = {
          id : this.etid,
          examtypename : this.f.etname.value,
        };

        this.adminService.AddNewExamType(examtype).subscribe(res => {
          //if (res.status === 200) {
            this.alertService.Success('New examtype added successfully');
            this.loading = false;
            this.close();
          //}

        },error =>{
          this.loading = false;
          throw error;
        }
        );

    }
  }

    close() {
        this.dialogRef.close();
    }

}
