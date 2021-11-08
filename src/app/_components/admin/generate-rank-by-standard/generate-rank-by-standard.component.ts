import { ExamType } from './../../../_models/admin/ExamType';
import { Standard } from './../../../_models/admin/Standard';
import { AdminService } from 'src/app/_services/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Examtypes } from 'src/app/_models/examtypes';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-generate-rank-by-standard',
  templateUrl: './generate-rank-by-standard.component.html',
  styleUrls: ['./generate-rank-by-standard.component.scss']
})
export class GenerateRankByStandardComponent implements OnInit {

  loading = false;
  submit = false;
  form: FormGroup;
  standards: Standard[];
  examtypes: ExamType[];
  hasData = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private adminService: AdminService,
    ) {

     }

  ngOnInit() {
    this.form = this.formBuilder.group({
      standardId: ['', [Validators.required]],
      examTypeId: ['', [Validators.required]],
    });

    this.getStandards();
    this.getExamTypes();
  }

  getStandards() {
    this.adminService.GetAllStandards().subscribe(res => {
      this.standards = res;
    });

  }

  getExamTypes() {

    this.adminService.GetAllExamTypes().subscribe(res => {
      this.examtypes = res;
    });
  }

  onSubmit() {
    this.submit = true;

    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    const sid = this.form.controls.standardId.value;
    const eid = this.form.controls.examTypeId.value;

    const model = {
      id: 1,
      standardId: sid ,
      examTypeId: eid,
    };

    const sname = this.standards.find(x => x.id === sid).standardname;
    const ename = this.examtypes.find(x => x.id === eid).examtypename;

    this.adminService.GenerateRankByStandard(model).subscribe(
        res => {
          this.alertService.Success(`Rank generated successfuly for - Standard: ${sname} & Exam Type: ${ename}`);
          this.loading = false;
        }, error => {
          this.loading = false;
          throw error;
        }
      );

  }
}
