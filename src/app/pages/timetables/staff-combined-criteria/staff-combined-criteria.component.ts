import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonService } from '../../services/common.service';
import { LoaderService } from '../../common/loading/loader.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  displayedColumns: string[] = ['Class', 'Subject', 'Staff', 'Periods', 'Action'];
  dataSource: any;
  selectedValue: string | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Make sure to import MatPaginator
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  input: any
  form: FormGroup | any;
  submitted!: boolean;
  constructor(private commonService: CommonService, private loader: LoaderService, private cdr: ChangeDetectorRef,
    private router: Router) { }


  ngOnInit(): void {
    this.getStaffCombined();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStaffCombined() {
    let postData = {
      schoolcode: localStorage.getItem('schoolcode')
    }
    this.loader.show()
    this.commonService.getHttpServiceWithDynamicParams(postData, 'getStaffDefinedList').subscribe(response => {
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

  onDelete(id: string) {
    console.log('Definedid', id);

    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear'),
      Definedid: id,
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
        this.commonService.deleteHttpService(postData, 'DeleteStaffDefinedList').subscribe((response) => {
          console.log('DeleteStaffDefinedList', response);

          if (response.status) {
            Swal.fire({
              title: "Success",
              text: "Successfully deleted!",
              icon: 'success',
              width: '350px',
              heightAuto: false
            }).then(() => {
              this.getStaffCombined()
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
            this.getStaffCombined();
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getStaffCombined();
      }
    });
  }
  onEdit(id: any) {
    this.router.navigate(['/timetable/AddStaffCombinedCriteria'], { state: { id: id } })
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
  Staff: string;
  Periods: string;
  // ['Class', 'Subject', 'Type', 'Staff', 'Periods', 'Action'];
}

const ELEMENT_DATA: PeriodicElement[] = [
  { Type: 'Reserved', Staff: 'ANTO MEDAT	', Subject: 'sub1', Periods: 'Day 1 1,Day 3 1,Day 2 1	', Class: 'UKG AA	' },


];
