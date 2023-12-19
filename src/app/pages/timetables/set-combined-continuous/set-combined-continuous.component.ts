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

  getCombinedClass() {
    let postData = {
      schoolcode: localStorage.getItem('schoolcode')
    }
    this.loader.show()
    this.service.getHttpServiceWithDynamicParams(postData, 'combinedClassList').subscribe(response => {
      console.log('combinedClassList', response);

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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(data: any) {
    if (data.cmbid) {
      this.router.navigate(['/timetable/AddSetCombinedContinuous'], {state: {id : data.cmbid}})
    }
  }

  onDelete(id: string) {
    console.log('combined', id);

    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear'),
      Combinedid: id,
      isArchive: false
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
        this.service.deleteHttpService(postData, 'DeleteCombinedclassList').subscribe((response) => {
          console.log('DeleteCombinedclassList', response);

          if (response.status) {
            Swal.fire({
              title: "Success",
              text: "Successfully deleted!",
              icon: 'success',
              width: '350px',
              heightAuto: false
            }).then(() => {
              this.getCombinedClass()
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
            this.getCombinedClass();
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getCombinedClass();
      }
    });
  }
}
interface Food {
  value: string;
  viewValue: string;
}

