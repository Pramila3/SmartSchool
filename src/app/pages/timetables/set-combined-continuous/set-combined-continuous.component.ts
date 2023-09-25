import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../common/loading/loader.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-set-combined-continuous',
  templateUrl: './set-combined-continuous.component.html',
  styleUrls: ['./set-combined-continuous.component.scss']
})
export class SetCombinedContinuousComponent implements OnInit {
  toppings = new FormControl('');
  toppingList: string[] = ['1 A', '1 B', '2 A', '2 B', '3 A', '3 C'];

  states: string[] = [
    'F-Block -dgf (342)', 'F-Block -'
  ]
  displayedColumns: string[] = ['Class', 'Subject', 'Staff', 'Periods', 'Action'];
  dataSource: any;
  selectedValue: string | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Make sure to import MatPaginator
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  input: any
  form: FormGroup | any;
  submitted!: boolean;
  constructor(private service: CommonService, private cdr: ChangeDetectorRef,
    private fb: FormBuilder, private router: Router, private loader: LoaderService) { }


  ngOnInit(): void {
    this.getCombinedClass();

  }
  foods: Food[] = [
    { value: '1 ', viewValue: 'Class' },
    { value: '2', viewValue: 'Subject' },
    { value: '3', viewValue: 'Staff' },
    { value: '4', viewValue: 'Day - Period' },


  ];

  getCombinedClass(){
    let postData = {
      schoolcode: localStorage.getItem('schoolcode')
    }
    this.loader.show()
    this.service.getHttpServiceWithDynamicParams(postData, 'combinedClassList').subscribe(response =>{
      if(response.status){
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
}
interface Food {
  value: string;
  viewValue: string;
}

