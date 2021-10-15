import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { Examtypes } from 'src/app/_models/examtypes';
import { Standards } from 'src/app/_models/Standards';
import { StudentResult } from 'src/app/_models/StudentResult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private standards: Standards[];
  private examtypes: Examtypes[];
  private studentResults: StudentResult[];
  // nocheckapi/getAllExamtypes

constructor(private http: HttpClient) {
 }

 public getStudentMarksChartByExamTypeAndSid(examtypeId:string,sid:string): Observable<any> {

  let params = new HttpParams();
  
  params = params.append('sid', sid);

  if(examtypeId=='1000')
  {
    params = params.append('allexamtypes', 'all');
    return this.http.get<any>(`${environment.apiUrl}StudentResults/sidallexamsreport`,{params})
    .pipe(map(res => {
      return res;
    })
      );
  
  }
  else{
    params = params.append('examTypeId', examtypeId);
    return this.http.get<any>(`${environment.apiUrl}StudentResults/sidexamreport`,{params})
    .pipe(map(res => {
      return res;
    })
      );
  
  }

   }

 public getStudentSidAutocomplete(prefix:string): Observable<any> {

  let params = new HttpParams();
  params = params.append('sidprefix', prefix);

  return this.http.get<any>(`${environment.apiUrl}StudentResults/allsids`,{params})
  .pipe(map(res => {
    return res;
  })
    );

  //return of(this.standards);

}



public getAllStandards(): Observable<Standards[]> {

  return this.http.get<Standards[]>(`${environment.apiUrl}nocheckapi/getAllStandards`)
  .pipe(
    catchError(
    err => { throw err; }
    ));

  //return of(this.standards);

}

//: Observable<Examtypes[]>
public getAllExamTypes(): Observable<Examtypes[]> {

  return this.http.get<Examtypes[]>(`${environment.apiUrl}nocheckapi/getAllExamtypes`)
  .pipe(map(res => {
      return res;
  }));

  //return of(this.examtypes);

}

getStudentResultByIDandExamType(studentid: string, exampType: string): Observable<any> {

    let params = new HttpParams();
    params = params.append('sid', studentid);
    params = params.append('examTypeId',exampType);

  
  
  return this.http.get<any>(`${environment.apiUrl}StudentResults/sidbased`, {params})
  .pipe(catchError(err =>{ throw err;}));

  //return of(this.studentResults);

}

getStudentResultByStandard(sid: string, examTypeId: string): Observable<StudentResult[]> {

 
let params = new HttpParams();
params = params.append('standarid', sid);
params = params.append('examTypeId',examTypeId);
  return this.http.get<StudentResult[]>(`${environment.apiUrl}StudentResults/classwise`,{params})
  .pipe(catchError(err => { throw err; }));

  //return of(this.studentResults);

}

getStudentMarksById(id: string): any {

  let params = new HttpParams();
  params = params.append('id', id);

  return this.http.get<StudentResult>(`${environment.apiUrl}studentmarks/getsubjectmarks`,
  {params});
  //.pipe(map((res: StudentResult)=>{
    //console.log(JSON.stringify(res) + 'getstudent by id')
    //return res || {};

  
  

 // .pipe(map(res=>{console.log('service response'+res[0]);
   // return res;}))
    //catchError(err => { throw err; }));
}

studentMarksUpdate(marksObj: any): any {
  //return true;
  return this.http.put<any>(`${environment.apiUrl}studentmarks/updatesubjectmarks`, marksObj).pipe(
    catchError(err => {
    throw err;
  }));
}



}
