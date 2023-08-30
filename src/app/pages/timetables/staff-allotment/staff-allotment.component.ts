import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../common/loading/loader.service';

@Component({
  selector: 'app-staff-allotment',
  templateUrl: './staff-allotment.component.html',
  styleUrls: ['./staff-allotment.component.scss']
})
export class StaffAllotmentComponent implements OnInit {
  displayedColumns: string[] = ['Class', 'Periods', 'Allot', 'Alloted', 'Action'];
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
    { value: 'Class', viewValue: 'Class' },
    { value: 'Total Periods', viewValue: 'Total Periods' },
    { value: 'Need to Allot', viewValue: 'Need to Allot' },
    { value: 'Alloted Periods', viewValue: 'Alloted Periods' },


  ];

}

interface Food {
  value: string;
  viewValue: string;
}


export interface PeriodicElement {
 
  Class: string;
  Periods: number;
  Allot: string;
  Alloted: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { Class: '1 A	', Periods: 222  , Allot: '', Alloted: '' },
  { Class: '2 A	', Periods: 33 , Allot: '', Alloted: '' },
  { Class: '3 A	', Periods: 2 , Allot: '', Alloted: '' },
  { Class: '4 A	', Periods: 32, Allot: '', Alloted: '' },
  { Class: '5 A	', Periods: 342, Allot: '', Alloted: '' },
];
