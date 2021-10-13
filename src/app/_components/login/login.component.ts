import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

loginForm: FormGroup;
loading = false;
submitted = false;
returnUrl: string;
subcription:boolean=false;



  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService,
              private alertService: AlertService


    ) {
this.authService.subcriptionValidation().subscribe(flag => {
  this.subcription=flag;
  console.log("flag value from login component="+flag);
})
  }

  ngOnInit() {
    this.loginForm =  this.formBuilder.group({
      userName : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      password : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]

    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
    return;
    }

    this.loading = true;
// call auth service
// this.authService.login(this.f.userName.value, this.f.password.value).subcribe(res => 
//   {
//     console.log(res);
//     this.alertService.Success('Login successful');
//     this.router.navigate([this.returnUrl]);
//     this.loading = false;
//     this.submitted = true;
//   })

// if (res)
// {
  
// }
// else{
//   this.alertService.Error('Username or password is incorrect');
//   this.loading = false;

// }
this.authService.login(this.f.userName.value, this.f.password.value)
.pipe(first())
 .subscribe(
   data =>{
  this.alertService.Success('Login successful');
   this.router.navigate([this.returnUrl]);
   this.loading = false;
   }
    ,error =>{
      this.loading = false;
      throw error;
    }
 )
  }

}
