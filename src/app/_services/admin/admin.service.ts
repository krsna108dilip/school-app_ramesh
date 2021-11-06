import { Standard } from './../../_models/admin/Standard';
import { ExamType } from './../../_models/admin/ExamType';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Role } from 'src/app/_models/Role';
import * as data from '../../_mock/admin_mock.json';
import { Users } from 'src/app/_models/admin/Users';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

constructor(private http: HttpClient) { }

public BulkQrCodeGenerate() {
  return this.http.get<any>(`${environment.apiUrl}bulkqrcodegenerator/bulkqrcode`)
  .pipe();
}

public GetAllStandards(): Observable<Standard[]> {

  return of(data.Standards);

    // return this.http.get<any>(`${environment.apiUrl}adminactions/`)
    // .pipe(
    //   catchError(
    //   err => { throw err; }
    //   ));

  }

public AddNewStandard(standard: any) {
  return this.http.post<any>(`${environment.apiUrl}adminactions/`, standard)
  .pipe(
    catchError(
    err => { throw err; }
    ));
}

public EditStandard(standard: any) {
  return this.http.put<any>(`${environment.apiUrl}adminactions/`, standard)
  .pipe(
    catchError(
    err => { throw err; }
    ));
}

public GetAllExamTypes(): Observable<ExamType[]> {

  return of(data.ExamTypes);

    // return this.http.get<any>(`${environment.apiUrl}adminactions/`)
    // .pipe(
    //   catchError(
    //   err => { throw err; }
    //   ));

  }

public AddNewExamType(examtype: any) {
  return this.http.post<any>(`${environment.apiUrl}adminactions/`, examtype)
  .pipe(
    catchError(
    err => { throw err; }
    ));
}

public EditExamType(examtype: any) {
  return this.http.put<any>(`${environment.apiUrl}adminactions/`, examtype)
  .pipe(
    catchError(
    err => { throw err; }
    ));
}

public GetUserRoles(): Observable<Role[]> {

//return of(data.Roles);

  return this.http.get<any>(`${environment.apiUrl}adminactions/getallRoles`)
  .pipe(
    catchError(
    err => { throw err; }
    ));

}

public GetAllUsers(): Observable<Users[]> {

  //return of(data.Users);

    return this.http.get<any>(`${environment.apiUrl}adminactions/getallUsers`)
    .pipe(
      catchError(
      err => { throw err; }
      ));

  }

public AddNewUser(newUser: any) {
  return this.http.post<any>(`${environment.apiUrl}adminactions/adduser`, newUser)
  .pipe(
    catchError(
    err => { throw err; }
    ));
}

public EditUser(updateUser: any) {
  return this.http.put<any>(`${environment.apiUrl}adminactions/updateuser`, updateUser)
  .pipe(
    catchError(
    err => { throw err; }
    ));
}


}






