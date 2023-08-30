import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss']
})
export class CustomizationComponent implements OnInit {

  selectedValue: string | undefined;
  selectedValuestudents: string | undefined
  
  input: any
  form: FormGroup | any;
  submitted!: boolean;
  constructor(private router: Router, public dialog: MatDialog) { }

 
  ngOnInit(): void {
  }
  foods: Food[] = [
    { value: 'Day1', viewValue: 'Day1' },
    { value: 'Day2', viewValue: 'Day2' },
    { value: 'Day3', viewValue: 'Day3' },
    { value: 'Day4', viewValue: 'Day4' },
    { value: 'Day5', viewValue: 'Day5' },
    { value: 'Day6', viewValue: 'Day6' },
    { value: 'Day7', viewValue: 'Day7' },
  ];
  students: students[] = [
    { value: 'THARUN SINGH D.S	', viewValue: 'THARUN SINGH D.S	' },
    { value: 'SIVA SIDDHARTH. R	', viewValue: 'SIVA SIDDHARTH. R	' },
    { value: 'LUMINRAJA.C	', viewValue: 'LUMINRAJA.C	' },
    { value: 'SIJAN S	', viewValue: 'SIJAN S	' },
    { value: 'VINAY JESUA.J	', viewValue: 'VINAY JESUA.J	' },
    { value: 'SUBEEN R	', viewValue: 'SUBEEN R	' },
    { value: 'VINITHIN.P	', viewValue: 'VINITHIN.P	' },
  ];

}

interface Food {
  value: string;
  viewValue: string;
}
interface students {
  value: string;
  viewValue: string;
}
