import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/_services/admin/admin.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-approve-marks',
  templateUrl: './approve-marks.component.html',
  styleUrls: ['./approve-marks.component.scss']
})
export class ApproveMarksComponent implements OnInit {


  loading = false;
  submit = false;
  form: FormGroup;
  hasData = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private adminService: AdminService,
    ) {

     }

  ngOnInit() {
    this.form = this.formBuilder.group({
      marks: [null, [Validators.requiredTrue]],
    });

  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submit = true;

    if (this.form.invalid) {
      console.log(this.submit);
      console.log(this.f.marks.errors);
      return;
    }


    this.loading = true;

    const model = {
      flag: this.form.controls.marks.value
    };
    console.log(model);


    this.adminService.ApproveAllMarks(model).subscribe(
        res => {
          this.alertService.Success('All marks are approved successfully');
          this.loading = false;
        }, error => {
          this.loading = false;
          throw error;
        }
      );

  }

}
