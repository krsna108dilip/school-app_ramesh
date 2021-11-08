import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/_services/admin/admin.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {

  form: FormGroup;
  username: string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private adminService: AdminService,
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
      this.username = this.data.user.username;
   }

  ngOnInit() {
    this.form = this.fb.group({
      currentpassword: ['', [Validators.required, Validators.minLength(8),
                        Validators.maxLength(20)]],
      newpassword: ['', [Validators.required, Validators.minLength(8),
                          Validators.maxLength(20)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8),
                            Validators.maxLength(20)]]
      });

    this.form.setValue({
        currentpassword: '',
        newpassword: '',
        confirmpassword: '',
      });

  }

  get f() { return this.form.controls; }

  onSubmit() {

    if (this.form.invalid) {
    return;
    }
    this.loading = true;

    const passwordmodel = {
        id: '1',
        username : 'user',
        currentpassword: this.f.currentpassword.value,
        newpassword: this.f.newpassword.value,
        confirmpassword: this.f.confirmpassword.value,
    };

    this.adminService.ChangePassword(passwordmodel).subscribe(res => {
          this.alertService.Success('New password updated successfully');
          this.loading = false;
          this.dialogRef.close();
      }, error => {
        this.loading = false;
        throw error;
      }
      );
  }

  close(){
    this.dialogRef.close();
  }

}
