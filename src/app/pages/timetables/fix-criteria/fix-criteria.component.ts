import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../common/loading/loader.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fix-criteria',
  templateUrl: './fix-criteria.component.html',
  styleUrls: ['./fix-criteria.component.scss']
})
export class FixCriteriaComponent implements OnInit {
  toppings = new FormControl('');
  toppingList: string[] = ['1 A', '1 B', '2 A', '2 B', '3 A', '3 C'];

  states: string[] = [
    'F-Block -dgf (342)', 'F-Block -'
  ]
  displayedColumns: string[] = ['class', 'subject', 'staff', 'type', 'day_Period', 'Action'];

  selectedValue: string | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Make sure to import MatPaginator
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  input: any
  dataSource: any
  form: FormGroup | any;
  submitted!: boolean;
  constructor(private service: CommonService, private cdr: ChangeDetectorRef,
    private fb: FormBuilder, private router: Router, private loader: LoaderService) { }


  ngOnInit(): void {
    this.getFixCriteriaList()
  }

  getFixCriteriaList() {
    this.loader.show()
    this.dataSource = new MatTableDataSource([]);
    this.service.getHttpServiceWithId(localStorage.getItem('schoolcode'), 'BindFixcriteriaList', 'schoolcode').subscribe((response: any) => {
      console.log('resultData ', response);
      if (response.status) {
        this.dataSource = new MatTableDataSource(response.resultData);
        console.log('resultData ', response.resultData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
        this.loader.hide();
      } else {
        this.loader.hide();
      }
    }, error => {
      this.loader.hide();
    });
  }
  onDelete(id: number) {
    let postData = {
      CLSTID: id,
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear'),
      reservedid: this.dataSource.rsvid,
      isArchive: "false"
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
        this.service.deleteHttpService(postData, 'DeleteFixCriteriaList').subscribe((response) => {
          console.log('deleteCriteriaList' , response);
          
          if (response.status) {
            Swal.fire({
              title: "Success",
              text: "Successfully deleted!",
              icon: 'success',
              width: '350px',
              heightAuto: false
            }).then(() => {
              this.getFixCriteriaList()
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
            this.getFixCriteriaList();
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getFixCriteriaList();
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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


