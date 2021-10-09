import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Roles } from 'src/app/_models/Roles';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: '../nav-menu/nav-menu.component.html',
  styleUrls: ['../nav-menu/nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  isExpanded = false;
  isAuthorized = false;
  userName: string ='';
  role: string ='';
  schoolname:string ='';
  isUser:boolean =false;
  isAdmin:boolean = false;
  isTechAdmin: boolean = false;
  lastlogin: Date = null;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private dialog: MatDialog,
              private alertService: AlertService
              ) {

    const currentSchool = this.authService.currentSchoolSubject.value;
    if(currentSchool){
      this.isAuthorized = true;
    }
    else{
      this.isAuthorized = false;
    }
  }

  ngOnInit() {
    this.authService.currentSchoolSubject.subscribe(school => {
      if(school != null){
        if((school.schoolname != null || school.schoolname !== undefined) && school.id > 0) {
          this.isAuthorized = true;
          this.userName = school.username;
          this.role = school.rolename;
          this.schoolname = school.schoolname;
          this.lastlogin = new Date(school.lastlogin);
          if(this.role === Roles.User)
          {
            this.isUser = true;
          }
          else if(this.role === Roles.Admin){
            this.isAdmin = true;
          }
          else
            this.isTechAdmin = true;

        }

      }
      else{
        this.isAuthorized = false;
        this.userName ='';
        this.role ='';
        this.schoolname = '';
        this.isUser = false;
        this.isAdmin = false;
        this.isTechAdmin = false;
        this.lastlogin = null;
      }
    })
  }

  collapse(){
    this.isExpanded = false;
  }

  toggle(){
    this.isExpanded = !this.isExpanded;
  }

  logout(){
    const confirmDialog = this.dialog.open(ConfirmDialogComponent,{
      data:{
        title:'Logout Confirmation',
        message:'Are you sure, do you want to logout?'
      }
    });
    confirmDialog.afterClosed().subscribe(res =>{
      if (res == true){
        this.alertService.Success('User logout successful');
        this.authService.logout();
    this.router.navigate(['/login']);
      }
    })





  }

}
