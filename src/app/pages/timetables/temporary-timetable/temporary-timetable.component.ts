import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-temporary-timetable',
  templateUrl: './temporary-timetable.component.html',
  styleUrls: ['./temporary-timetable.component.scss']
})
export class TemporaryTimetableComponent implements OnInit {

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


  ngOnInit(): void {
  }
  foods: Food[] = [
    { value: 'Class', viewValue: 'Class' },
    { value: 'Total Periods', viewValue: 'Total Periods' },
    { value: 'Need to Allot', viewValue: 'Need to Allot' },
    { value: 'Alloted Periods', viewValue: 'Alloted Periods' },


  ];
  openDialog() {
    this.dialog.open(AddTemporaryTimetablemodal);
  }

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



@Component({
  selector: 'Add-Temporary-Timetable-modal',
  templateUrl: './Add-Temporary-Timetable.html',
  styleUrls: ['./temporary-timetable.component.scss']

})
export class AddTemporaryTimetablemodal {

  selectedValue: string | undefined;
  input: any
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  foods: Food[] = [
    { value: '1 A', viewValue: '1 A' },
    { value: '1 B', viewValue: '1 B' },
    { value: '2 A', viewValue: '2 A' },
    { value: '2 B', viewValue: '2 B' },


  ];

}

interface Food {
  value: string;
  viewValue: string;
}
