import { Standard } from './../../_models/admin/Standard';
import { ExamType } from './../../_models/admin/ExamType';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Role } from 'src/app/_models/Role';
import * as data from '../../_mock/admin_mock.json';
import { Users } from 'src/app/_models/admin/Users';
import { Hero } from 'src/app/_mock/in-memory-admin-data.service';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  api = 'api/heroes';
  options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

constructor(private http: HttpClient) { }

public BulkQrCodeGenerate() {
  return this.http.get<any>(`${environment.apiUrl}bulkqrcodegenerator/bulkqrcode`)
  .pipe();
}

public getHeroes(): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.api).pipe(
    catchError(error => {
      throw error;
    })
  );
}

public GetAllStandards(): Observable<Standard[]> {

  //return of(data.Standards);
  // `${environment.apiUrl}adminactions/`

    return this.http.get<Standard[]>('api/standards')
    .pipe(
      catchError(
      err => { throw err; }
      ));

  }

public AddNewStandard(standard: Standard): Observable<Standard[]> {
  // `${environment.apiUrl}adminactions/`
  return this.http.post<Standard[]>('api/standards', standard)
  .pipe(
    catchError(
    err => { throw err; }
    ));
}

public EditStandard(standard: Standard): Observable<Standard[]> {
  // `${environment.apiUrl}adminactions/`
  return this.http.put<Standard[]>('api/standards', standard)
  .pipe(
    catchError(
    err => { throw err; }
    ));
}

public GetAllExamTypes(): Observable<ExamType[]> {

  //return of(data.ExamTypes);
  //`${environment.apiUrl}adminactions/`

    return this.http.get<ExamType[]>('api/examtypes')
    .pipe(
      catchError(
      err => { throw err; }
      ));

  }

public AddNewExamType(examtype: ExamType): Observable<ExamType[]> {
// `${environment.apiUrl}adminactions/`
  return this.http.post<ExamType[]>('api/examtypes', examtype)
  .pipe(
    catchError(
    err => { throw err; }
    ));
}

public EditExamType(examtype: ExamType): Observable<ExamType[]> {
  // `${environment.apiUrl}adminactions/`
  return this.http.put<ExamType[]>('api/examtypes', examtype)
  .pipe(
    catchError(
    err => { throw err; }
    ));
}

public GetUserRoles(): Observable<Role[]> {

//return of(data.Roles);
// `${environment.apiUrl}adminactions/getallRoles`

  return this.http.get<Role[]>('api/roles')
  .pipe(
    catchError(
    err => { throw err; }
    ));

}

public GetAllUsers(): Observable<Users[]> {

  //return of(data.Users);
  // `${environment.apiUrl}adminactions/getallUsers`

    return this.http.get<Users[]>('api/users')
    .pipe(
      catchError(
      err => { throw err; }
      ));

  }

public AddNewUser(newUser: Users): Observable<Users[]> {
  // `${environment.apiUrl}adminactions/adduser`
  return this.http.post<Users[]>('api/users', newUser)
  .pipe(
    catchError(
    err => { throw err; }
    ));
}

public EditUser(updateUser: Users): Observable<Users[]> {
  // `${environment.apiUrl}adminactions/updateuser`
  return this.http.put<Users[]>('api/users', updateUser)
  .pipe(
    catchError(
    err => { throw err; }
    ));
}


}






