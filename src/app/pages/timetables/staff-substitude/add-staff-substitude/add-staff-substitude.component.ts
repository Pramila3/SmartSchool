import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();


@Component({
  selector: 'app-add-staff-substitude',
  templateUrl: './add-staff-substitude.component.html',
  styleUrls: ['./add-staff-substitude.component.scss']
})
export class AddStaffSubstitudeComponent implements OnInit {

  displayedColumns: string[] = ['TimetableName', 'DateFrom', 'DateTo', 'ImportFrom', 'Action'];
  dataSource = ELEMENT_DATA;
  selectedValue: string | undefined;
  selectedValuesetting: string | undefined
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Make sure to import MatPaginator
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  input: any
  form: FormGroup | any;
  submitted!: boolean;
  constructor(private router: Router, public dialog: MatDialog) { }

  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
 campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });
  ngOnInit(): void {
  }
  foods: Food[] = [
    { value: 'Class', viewValue: 'Class' },
    { value: 'Staff', viewValue: 'Staff' },
    { value: 'Date', viewValue: 'Date' },
    { value: 'Day', viewValue: 'Day' },
    { value: 'Period', viewValue: 'Period' },
    { value: 'Substituted With', viewValue: 'Substituted With' },
    { value: 'Temp', viewValue: 'Temp' },




  ];


}

interface Food {
  value: string;
  viewValue: string;
}


export interface PeriodicElement {

  TimetableName: string;
  DateFrom: string;
  DateTo: string;
  ImportFrom: string;
  // displayedColumns: string[] = ['TimetableName', 'DateFrom', 'DateTo', 'ImportFrom', 'Action'];

}

const ELEMENT_DATA: PeriodicElement[] = [
  { TimetableName: 'Timetable 1	', DateFrom: '12-01-2023', DateTo: '12-01-2023', ImportFrom: 'Default' },
  { TimetableName: 'Timetable 1	', DateFrom: '10-01-2023', DateTo: '12-01-2023', ImportFrom: 'Default' },
  { TimetableName: 'Timetable 1', DateFrom: '31-01-2023', DateTo: '12-01-2023', ImportFrom: 'Default' },
  { TimetableName: 'Timetable 1	', DateFrom: '1-01-2023', DateTo: '12-01-2023', ImportFrom: 'Default' },
  { TimetableName: 'Timetable 1', DateFrom: '20-01-2023', DateTo: '12-01-2023', ImportFrom: 'Default' },
];
