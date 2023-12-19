import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultLayoutsComponent } from '../default-layouts/default-layouts.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(DefaultLayoutsComponent)
  defaultLayoutsComponent!: DefaultLayoutsComponent;

  constructor(private router: Router, private defaultLayoutsComponent1: DefaultLayoutsComponent) { }

  ngOnInit(): void {
  }
  onclick(moduleName: any){
    localStorage.setItem('modulName', moduleName);
    this.defaultLayoutsComponent1.navigationFunction();
    this.router.navigate(['/pages /timetables'])

  }
}
