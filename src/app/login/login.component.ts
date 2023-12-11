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
  showErrorMessage: boolean = false;
  errorMessage: string = '';
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
              localStorage.setItem('modulName', "Timtable");
              this.router.navigate(['/timetables'])
            } else {

              this.Error = true;
              this.logInError = res.statusMessage
              this.loader.hide();
            }

          })
        }
      }
      // else {
      //   alert("Invalid Captcha")
      // }
      else {
        // Customize the "Invalid Captcha" alert
        Swal.fire({
          title: "Invalid Captcha",
          text: "Please enter the correct Captcha",
          icon: 'error',
          timer: 3000 // Adjust the timer as needed
        });
      }
    } else {
      // Customize the "Invalid Captcha" alert
      Swal.fire({
        text: "Please enter the Captcha",
        icon: 'info',
        timer: 3000 // Adjust the timer as needed
      });
      this.loader.hide();
    }
  }

  generateRandomNumber() {
    this.randomNumber = Math.floor(Math.random() * 9000) + 1000 // Generate a number between 1 and 100
    if (this.userInput) {
      this.userInput = null;
    }
  }

  preventAction(event: ClipboardEvent) {
    event.preventDefault();
  }
}
