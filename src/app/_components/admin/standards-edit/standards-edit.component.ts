import { AdminService } from 'src/app/_services/admin/admin.service';
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
  loading = false;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private adminService: AdminService,
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

      this.form.setValue({
        sid: this.sid,
        sname:this.sname,
      });

  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

      this.loading = true;

      //this.loading = true;


      if (this.data.isEdit === true) {

        const standard = {
          id: this.sid,
          standardname : this.f.sname.value,
        };

        this.adminService.EditStandard(standard).subscribe(res => {
          //if (res.status === 200) {
            this.alertService.Success('Standart updated successfully');
            this.loading = false;
            //this.close();
            this.dialogRef.close();
          //}

        },error =>{
          this.loading = false;
          throw error;
        }
        );

      } else {
        const standard = {
          id:this.sid,
          standardname : this.f.sname.value,
        };

        this.adminService.AddNewStandard(standard).subscribe(res => {
          console.log('result'+ res);
          //if (res.status === 200) {
           
            this.alertService.Success('New user added successfully');
            this.loading = false;
            this.dialogRef.close();
            //this.close();
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
