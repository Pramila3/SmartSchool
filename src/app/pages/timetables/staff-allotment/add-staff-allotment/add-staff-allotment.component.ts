import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/pages/common/loading/loader.service';
import { CommonService } from 'src/app/pages/services/common.service';

@Component({
  selector: 'app-add-staff-allotment',
  templateUrl: './add-staff-allotment.component.html',
  styleUrls: ['./add-staff-allotment.component.scss']
})
export class AddStaffAllotmentComponent implements OnInit {
  displayedColumns: string[] = ['Subject', 'Edit', 'TotalPeriods', 'AllotedPeriods', 'Staff', 'Hours'];
  dataSource = ELEMENT_DATA;
  selectedValue: string | undefined;
  selectedValuesetting: string | undefined
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Make sure to import MatPaginator
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  input: any
  form: FormGroup | any;
  submitted!: boolean;
  constructor(private service: CommonService, private cdr: ChangeDetectorRef,
    private fb: FormBuilder, private router: Router, private loader: LoaderService) { }


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


export interface PeriodicElement {

  Subject: string;
  TotalPeriods: number;
  AllotedPeriods: number;
  Staff: string;
  Hours: string;
  // ['Subject', 'Edit', 'TotalPeriods', 'AllotedPeriods', 'Staff','Hours'];
}

const ELEMENT_DATA: PeriodicElement[] = [
  { Subject: 'ACCOUNTANCY', TotalPeriods: 222, AllotedPeriods: 12, Staff: '', Hours: '0' },
  { Subject: 'Hindi-II	', TotalPeriods: 33, AllotedPeriods: 0, Staff: '', Hours: '0' },
  { Subject: 'MATHS', TotalPeriods: 2, AllotedPeriods: 0, Staff: '', Hours: '0' },
  { Subject: 'BIOLOGY', TotalPeriods: 32, AllotedPeriods: 0, Staff: '', Hours: '0' },
  { Subject: 'SCIENCE', TotalPeriods: 342, AllotedPeriods: 0, Staff: '', Hours: '0' },
];
