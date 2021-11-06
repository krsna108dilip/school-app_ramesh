import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Role } from 'src/app/_models/Role';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

constructor(private http: HttpClient) { }

public BulkQrCodeGenerate() {
  return this.http.get<any>(`${environment.apiUrl}bulkqrcodegenerator/bulkqrcode`)
  .pipe();
}

public GetUserRoles(): Observable<Role[]> {

  return this.http.get<any>(`${environment.apiUrl}adminactions/getallRoles`)
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






