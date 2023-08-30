import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../common/loading/loader.service';

@Component({
  selector: 'app-classwise-staff-allotment',
  templateUrl: './classwise-staff-allotment.component.html',
  styleUrls: ['./classwise-staff-allotment.component.scss']
})
export class ClasswiseStaffAllotmentComponent implements OnInit {
  toppings = new FormControl('');
  toppingList: string[] = ['1 A', '1 B', '2 A', '2 B', '3 A', '3 C'];

  states: string[] = [
    'F-Block -dgf (342)', 'F-Block -'
  ]
  displayedColumns: string[] = ['Select', 'Subject', 'TotalPeriods', 'Staff', 'Action'];
  dataSource = ELEMENT_DATA;
  selectedValue: string | undefined;
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
    { value: '3 A', viewValue: '3 A' },

  ];
}
interface Food {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  Staff: string;
  TotalPeriods: number;
  Subject: string;
  // Assigned: string;
  // ['Select', 'Subject', 'TotalPeriods', 'Staff', 'Action'];
}

const ELEMENT_DATA: PeriodicElement[] = [
  { TotalPeriods: 1, Staff: 'ACC  ', Subject: 'ACCOUNTANCY',  },
  { TotalPeriods: 2, Staff: 'kr', Subject: 'karate	',  },
  { TotalPeriods: 3, Staff: 'sub1', Subject: 'sub1', },
  { TotalPeriods: 4, Staff: 'aaaaaa	', Subject: 'aaaaaaa',  },
  { TotalPeriods: 5, Staff: 'BMAT', Subject: 'BUSINESS MATHS	',  },
  { TotalPeriods: 6, Staff: 'GK', Subject: 'GENERAL KNOWLEDGE	',  },
  { TotalPeriods: 7, Staff: 'CHE45345', Subject: 'CHEMISTRY	',  },
  { TotalPeriods: 8, Staff: 'MAT', Subject: 'MATHS',  },
  { TotalPeriods: 9, Staff: 'BIO-ZOO	', Subject: 'BIO-ZOOLOGY	', },
  { TotalPeriods: 10, Staff: 'SCI', Subject: 'SCIENCE	',  },
];