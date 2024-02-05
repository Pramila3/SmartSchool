import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.scss']
})
export class ApplicantListComponent implements OnInit {
  toppings = new FormControl('');
  toppingList: string[] = ['1 A', '1 B', '2 A', '2 B', '3 A', '3 C'];

  states: string[] = [
    'F-Block -dgf (342)', 'F-Block -'
  ]
  displayedColumns: string[] = ['Applicant', 'Gender', 'Qualification', 'PostApplied', 'EMail', 'Action'];
  dataSource = ELEMENT_DATA;
  selectedValue: string | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Make sure to import MatPaginator
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  input: any
  form: FormGroup | any;
  submitted!: boolean;
  constructor() { }


  ngOnInit(): void {
  }
  foods: Food[] = [
    { value: '1 A', viewValue: '1 A' },
    { value: '1 B', viewValue: '1 B' },
    { value: '2 A', viewValue: '2 A' },
    { value: '2 B', viewValue: '2 B' },
    { value: '3 A', viewValue: '3 A' },

  ];
}
interface Food {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  Gender: string;
  Applicant: string;
  Qualification: string;
  PostApplied: string;
  EMail: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { Applicant: 'Ravi', Gender: 'Male  ', Qualification: 'ACCOUNTANCY', PostApplied: 'Yes', EMail: ' example@gmail.com ' },
  { Applicant: 'Vimal', Gender: 'Male', Qualification: 'karate	', PostApplied: 'Yes', EMail: '  ' },
  { Applicant: 'Francis', Gender: 'Male', Qualification: 'sub1', PostApplied: 'Yes', EMail: '  ' },
  { Applicant: 'Edwin', Gender: 'Male	', Qualification: 'aaaaaaa', PostApplied: 'Yes', EMail: '  ' },

];
