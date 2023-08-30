import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../common/loading/loader.service';

@Component({
  selector: 'app-allot-subject',
  templateUrl: './allot-subject.component.html',
  styleUrls: ['./allot-subject.component.scss']
})

export class AllotSubjectComponent implements OnInit {
  toppings = new FormControl('');
  toppingList: string[] = ['1 A', '1 B', '2 A', '2 B', '3 A', '3 C'];

  states: string[] = [
    'F-Block -dgf (342)', 'F-Block -'
  ]
  displayedColumns: string[] = ['Select', 'Code', 'Subject', 'Assigned', 'location', 'Order', 'Workload'];
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
  Code: string;
  position: number;
  Subject: string;
  Assigned: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, Code: 'ACC  ', Subject: 'ACCOUNTANCY', Assigned: 'Yes' },
  { position: 2, Code: 'kr', Subject: 'karate	',  Assigned: 'Yes' },
  { position: 3, Code: 'sub1', Subject: 'sub1',  Assigned: 'Yes'},
  { position: 4, Code: 'aaaaaa	', Subject: 'aaaaaaa',  Assigned: 'Yes' },
  { position: 5, Code: 'BMAT', Subject: 'BUSINESS MATHS	',  Assigned: 'Yes'},
  { position: 6, Code: 'GK', Subject: 'GENERAL KNOWLEDGE	',  Assigned: 'Yes' },
  { position: 7, Code: 'CHE45345', Subject: 'CHEMISTRY	',  Assigned: 'Yes' },
  { position: 8, Code: 'MAT', Subject: 'MATHS',  Assigned: 'Yes' },
  { position: 9, Code: 'BIO-ZOO	', Subject: 'BIO-ZOOLOGY	',  Assigned: 'Yes' },
  { position: 10, Code: 'SCI', Subject: 'SCIENCE	',  Assigned: 'Yes' },
];
