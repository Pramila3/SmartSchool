import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-replacement',
  templateUrl: './staff-replacement.component.html',
  styleUrls: ['./staff-replacement.component.scss']
})
export class StaffReplacementComponent implements OnInit {

  selectedValue: string | undefined;
  selectedValuesetting: string | undefined
  
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


}

interface Food {
  value: string;
  viewValue: string;
}

