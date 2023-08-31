import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoaderService } from '../pages/common/loading/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  submitted = false;
  Error!: boolean;
  logInError: any;
  randomNumber!: number;
  userInput!: any;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private loader: LoaderService) {
    this.generateRandomNumber();
  }

  ngOnInit(): void {
    this.formGroup();
  }
  formGroup() {
    this.loginForm = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
      schoolCode: [null]
    })
  }

  get f() {
    return this.loginForm.controls;
  }
  login() {
    this.submitted = true
    let body = { ...this.loginForm.value }
    body.schoolCode = body.userName
    if (this.userInput) {
      if (+(this.userInput) === this.randomNumber) {
        if (this.loginForm.valid) {
          this.loader.show();
          this.authService.postHttpServicesighIn(body, 'usersLogin').subscribe((res: any) => {
            if (res.status) {
              this.loader.hide();
              Swal.fire({
                title: "Signed in successfully",
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
              });
              this.router.navigate(['/home'])
            } else {
              this.loader.hide();
              this.Error = true;
              this.logInError = res.statusMessage
            }

          })
        }
      } else {
        alert("Invalid Captcha")
      }
    } else {
      alert("Please Enter Captcha")
    }
  }

  generateRandomNumber() {
    this.randomNumber = Math.floor(Math.random() * 9000) + 1000 // Generate a number between 1 and 100
    if(this.userInput){
      this.userInput = null;
    }
  }

  preventAction(event: ClipboardEvent) {
    event.preventDefault();
  }
}
