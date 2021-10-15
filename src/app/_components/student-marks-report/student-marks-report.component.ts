import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { Examtypes } from 'src/app/_models/examtypes';
import { StudentService } from 'src/app/_services/student/student.service';

@Component({
  selector: 'app-student-marks-report',
  templateUrl: './student-marks-report.component.html',
  styleUrls: ['./student-marks-report.component.scss']
})
export class StudentMarksReportComponent implements OnInit {
  loading: boolean = false;
  submit: boolean = false;
  ssrForm: FormGroup;
  examtypes: Examtypes[];
  options :Observable<any>;
  filteredOptions: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService) { }

 
 
   //myType = 'PieChart';
  // myType = 'BarChart';
  myType = 'ColumnChart';
myData = [
  
   /*  ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Kairo', 19500000] */

  ]; 
  myTitle='Student marks chart report';
  myWidth=800;
  myHeight=500;
  myOptions={
    //is3D:true,
    //isStacked:true,
    titleTextStyle: {
      color: '#cc00cc',    // any HTML string color ('red', '#cc00cc')
      fontName:'Times New Roman', // i.e. 'Times New Roman'
      fontSize: 18, // 12, 18 whatever you want (don't specify px)
      bold: true,    // true or false
      italic: false   // true of false
  },
  legend: { position: "none" },
//colors: ['#e2431e', '#e7711b']
  };



  ngOnInit() {
    this.ssrForm = this.formBuilder.group({
      studentid: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      examtypeid: ['', [Validators.required]]
    });

    this.getExamTypes();
    this.filteredOptions = this.ssrForm.controls.studentid.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
            return this.filter(val || '')
       })
    )
  }

  filter(val: string): Observable<any> {

    
    return this.studentService.getStudentSidAutocomplete(val)
     .pipe( res => {
      return this.options=res;
     }
      
       )
     
   }
  getExamTypes() {
    this.studentService.getAllExamTypes().subscribe(res =>
      this.examtypes = res);
  }



  get f() { return this.ssrForm.controls; }

  onSubmit() {
    this.submit = true;

    if (this.ssrForm.invalid)
      return;

      this.loading = true;

      let sid = this.ssrForm.controls.studentid.value;
      let etid = this.ssrForm.controls.examtypeid.value;
      console.log(sid);
      console.log(etid);

      this.studentService.getStudentMarksChartByExamTypeAndSid(etid,sid).subscribe(res => {

                this.loading = false;
                // clear up the database so it doesn't keep pushing unwanted data into it.
      //  this.data = [];
        // change the title
       // this.title = 'Database data of Naruto sales in the last 7 Years';
        // change the type
       // this.type = 'ColumnChart';
        console.log(res.mapdata);
        let result=res.mapdata;
        this.myData=[];
        this.myTitle='Student marks Report By ExamType and Student Id:'+sid;


        // push in the data foreach result year and sales.
        // I used the .toString method because the x-axis has to be in string format.
        for (let item in result) {
          console.log("item from ts file"+item);
          console.log("item array value"+result[item]);
          this.myData.push([item.toString(), result[item]]);
        }
         console.log("my data ="+this.myData);

      });


      // get the data from service



  }


}
