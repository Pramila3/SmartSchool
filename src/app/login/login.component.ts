import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('schoolcode', 'testonline');
    localStorage.setItem('academicYear', new Date().getFullYear().toString());
  }

}
