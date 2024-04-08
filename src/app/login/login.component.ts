import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../_interface/login.model';
import { AuthenticatedResponse } from '../_interface/authenticated-response.model';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../shared/error-handler.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;
  credentials: LoginModel = {email:'', password:''};

  public loginForm1: FormGroup;
  private dialogConfig;
  public loginModel:LoginModel;
  constructor(private router: Router, private http: HttpClient,private location: Location,private dialog: MatDialog,private errorService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.loginForm1 = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    }
  }

  login1 = ( loginFormValue:any) => {

    if (this.loginForm1.valid) {
      console.log("loginFormValue :" + loginFormValue.email + loginFormValue.password);
      console.log(this.loginForm1.valid);

      // this.loginModel.email = loginFormValue.email;
      // this.loginModel.password = loginFormValue.password;

      this.credentials.email=loginFormValue.email;
      this.credentials.password=loginFormValue.password;

      console.log("loginFormValue2 :" + this.credentials.email + this.credentials.password);
      this.http.post<AuthenticatedResponse>("http://localhost:5000/api/token/login", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.accessToken;
          const refreshToken = response.refreshToken;
          localStorage.setItem("jwt", token);
          localStorage.setItem("refreshToken", refreshToken);
          this.invalidLogin = false;
          this.router.navigate(["/"]);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
    }

  }

  login = ( form: NgForm) => {
    console.log("form :" + form);
    console.log(form.valid);
    if (form.valid) {
      this.http.post<AuthenticatedResponse>("http://localhost:5000/api/token/login", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.accessToken;
          const refreshToken = response.refreshToken;
          localStorage.setItem("jwt", token);
          localStorage.setItem("refreshToken", refreshToken);
          this.invalidLogin = false;
          this.router.navigate(["/"]);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm1.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }
}

