import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentResult } from 'src/app/_models/StudentResult';
import { AlertService } from 'src/app/_services/alert.service';
import { StudentService } from 'src/app/_services/student/student.service';

@Component({
  selector: 'app-classwise-result-edit',
  templateUrl: './classwise-result-edit.component.html',
  styleUrls: ['./classwise-result-edit.component.scss']
})

export class ClasswiseResultEditComponent implements OnInit {

  form: FormGroup;
  id:string;
  sid: string;
  sname: string;
  classsec: string;
  telugu: number;
  hindi: number;
  english: number;
  maths: number;
  science: number;
  social: number;
  examtype: string;
  student: StudentResult[];
  stu:any;
  //onUpdate = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private studentService: StudentService,
    private dialogRef: MatDialogRef<ClasswiseResultEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
    ) {
      this.id=this.data.student.id;
      this.sid= this.data.student.sid;
      this.sname = this.data.student.sname;
      this.classsec = this.data.student.classsection;
      this.examtype = this.data.student.examtype;

      this.telugu = this.data.student.telugu;
      this.hindi = this.data.student.hindi;
      this.english = this.data.student.english;
      this.maths = this.data.student.maths;
      this.science = this.data.student.science;
      this.social = this.data.student.social;

     
      // this.sid = this.stu.sid;
      // this.sname = this.stu.sname;
      // this.classsec = this.stu.classsection;
      // this.telugu = this.stu.telugu;
      // this.hindi = this.data.hindi;
      // this.english = this.data.english;
      // this.maths = this.data.maths;
      // this.science = this.data.science;
      // this.social = this.data.social;
      // console.log(this.data.sid + 'this.data')
      
    

     }

  ngOnInit() {
    this.form = this.fb.group({
      sid: ['', []],
      sname: ['', []],
      classsec: ['', []],
      telugu: [null, [Validators.required, Validators.min(-1), Validators.max(100),
                  Validators.minLength(1), Validators.maxLength(3)]],
      hindi: [null, [Validators.required, Validators.min(-1), Validators.max(100),
                  Validators.minLength(1), Validators.maxLength(3)]],
      english: [null, [Validators.required, Validators.min(-1), Validators.max(100),
                Validators.minLength(1), Validators.maxLength(3)]],
      maths: [null, [Validators.required, Validators.min(-1), Validators.max(100),
              Validators.minLength(1), Validators.maxLength(3)]],
      science: [null, [Validators.required, Validators.min(-1), Validators.max(100),
              Validators.minLength(1), Validators.maxLength(3)]],
      social: [null, [Validators.required, Validators.min(-1), Validators.max(100),
              Validators.minLength(1), Validators.maxLength(3)]],

  });
  // this.studentService.getStudentMarksById(this.id).subscribe(
  //   res => {
  //     // this.sid=res.sid;
  //     // this.sname = res.sname;
  //     // console.log(this.sname);
  //     // this.classsec = res.classsection;
  //     this.telugu = res.telugu;
  //     this.hindi = res.hindi;
  //     this.english = res.english;
  //     this.maths = res.maths;
  //     this.science = res.science;
  //     this.social = res.social;
  //   }
  // );

  console.log('telugu'+ this.telugu);

  

  this.form.setValue({
    sid: this.sid,
    sname:this.sname,
    classsec:this.classsec,
    telugu : this.telugu,
    hindi : this.hindi,
    english: this.english,
    maths : this.maths,
    science : this.science,
    social : this.social,
  });
}

get f() { return this.form.controls; }

onSubmit() {



//       this.student =  {
// sid : this.sid,
// sname : this.sname,
// classsection : this.classsec,
// firstLan : this.firstlang.toString(),
// secondLan : this.secondlang.toString(),
// engilsh : this.english.toString(),
// maths : this.maths.toString(),
// social : this.social.toString(),
// science : this.science.toString(),
//       }


let student = {
  id: this.id,
  sid : this.sid,
  sname: this.sname,
  classsection: this.classsec,
  telugu: Number(this.f.telugu.value),
  hindi: Number(this.f.hindi.value),
  english: Number(this.f.english.value),
  maths: Number(this.f.maths.value),
  social: Number(this.f.social.value),
  science: Number(this.f.science.value),
  examtype: this.examtype,

}

this.studentService.studentMarksUpdate(student).subscribe(res => {


  this.dialogRef.close();
  this.alertService.Success('Marks are updated');
});

//this.dialogRef.close({data: {firstlang:this.f.firstlang.value, sid:this.f.sid.value}});
}

close() {
    this.dialogRef.close();
}




}
