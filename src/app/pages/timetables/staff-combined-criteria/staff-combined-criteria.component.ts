import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonService } from '../../services/common.service';
import { LoaderService } from '../../common/loading/loader.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-staff-combined-criteria',
  templateUrl: './staff-combined-criteria.component.html',
  styleUrls: ['./staff-combined-criteria.component.scss']
})
export class StaffCombinedCriteriaComponent implements OnInit {

  toppings = new FormControl('');
  toppingList: string[] = ['1 A', '1 B', '2 A', '2 B', '3 A', '3 C'];

  states: string[] = [
    'F-Block -dgf (342)', 'F-Block -'
  ]
  displayedColumns: string[] = ['Class', 'Subject','Staff', 'Periods', 'Action'];
  dataSource : any;
  selectedValue: string | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Make sure to import MatPaginator
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  input: any
  form: FormGroup | any;
  submitted!: boolean;
  constructor(private commonService: CommonService, private loader: LoaderService, private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.getStaffCombined();
  }
  getStaffCombined(){
    let postData = {
      schoolcode: localStorage.getItem('schoolcode')
    }
    this.commonService.getHttpServiceWithDynamicParams(postData, 'getStaffDefinedList').subscribe(response =>{
      if (response.status) {
        this.loader.hide();
        this.dataSource = new MatTableDataSource(response.resultData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
      } else {
        this.loader.hide();
      }
    }, error => {
      this.loader.hide();
    });
  }
  foods: Food[] = [
    { value: '1 ', viewValue: 'Class' },
    { value: '2', viewValue: 'Subject' },
    { value: '3', viewValue: 'Staff' },
    { value: '4', viewValue: 'Day - Period' },

  ];
}
interface Food {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  Class: string;
  Type: string;
  Subject: string;
  Staff : string;
  Periods: string;
  // ['Class', 'Subject', 'Type', 'Staff', 'Periods', 'Action'];
}

const ELEMENT_DATA: PeriodicElement[] = [
  { Type: 'Reserved', Staff: 'ANTO MEDAT	', Subject: 'sub1', Periods : 'Day 1 1,Day 3 1,Day 2 1	', Class: 'UKG AA	' },
 
 
];
