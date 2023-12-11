import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { LoaderService } from '../../common/loading/loader.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-staff-substitude',
  templateUrl: './staff-substitude.component.html',
  styleUrls: ['./staff-substitude.component.scss']
})

export class StaffSubstitudeComponent implements OnInit {

  displayedColumns: string[] = ['date', 'class', 'subject', 'staff', 'day', 'period', 'subtitute', 'Action'];
  dataSource: any;
  selectedValue: string | undefined;
  selectedValuesetting: string | undefined
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Make sure to import MatPaginator
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  input: any
  form: FormGroup | any;
  submitted!: boolean;

  fromDate = new Date()
  toDate = new Date()

  constructor(private router: Router, public dialog: MatDialog, private service: CommonService,
    private loader: LoaderService, private datePipe: DatePipe, 
    private cdr: ChangeDetectorRef) { }

  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });
  ngOnInit(): void {
    this.getSubtituteStaffList()
  }
  getSubtituteStaffList() {
    this.loader.show()
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      datefrom: this.fromDate ? this.datePipe.transform(this.fromDate, 'dd/MM/yyyy') : '',
      dateto: this.toDate ? this.datePipe.transform(this.toDate, 'dd/MM/yyyy') : ''
    }
    this.service.getHttpServiceWithDynamicParams(postData, 'substituteStaffList').subscribe((response: any) => {
      if (response.status) {
        this.dataSource = new MatTableDataSource(response.resultData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loader.hide()
      }else{
        this.loader.hide()
      }
    }, error =>{
      this.loader.hide()
    })

    console.log(postData);

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

  onDelete(data: any){
    let postData = {
      ids: data.id,
      schoolcode: localStorage.getItem('schoolcode'),
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      width: '350px',
    }).then((result) => {
      if (result.value) {
        this.service.getHttpServiceWithDynamicParams(postData, 'deleteStaffSubstitute').subscribe((response) => {
          if (response.status) {
            Swal.fire({
              title: "Success",
              text: "Successfully deleted!",
              icon: 'success',
              width: '350px',
              heightAuto: false
            }).then(() => {
              this.getSubtituteStaffList()
            });
            this.cdr.markForCheck();
          } else {
            Swal.fire({
              title: "Error",
              text: response.statusMessage,
              icon: 'warning',
              width: '350px',
              heightAuto: false
            })
            this.getSubtituteStaffList();
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getSubtituteStaffList();
      }
    });
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
