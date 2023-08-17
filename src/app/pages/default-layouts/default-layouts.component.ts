import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-layouts',
  templateUrl: './default-layouts.component.html',
  styleUrls: ['./default-layouts.component.scss']
})
export class DefaultLayoutsComponent implements OnInit {

  moduleName!: any
  constructor(private router: Router) {

  }

  ngOnInit(): void {
   
  }
  navigationFunction() {
    this.moduleName = localStorage.getItem('modulName');
    this.router.navigate(['/timetables'])
    console.log(this.moduleName);
  }
}
