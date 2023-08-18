import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonService } from '../../services/common.service';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoaderService } from '../../common/loading/loader.service';
@Component({
  selector: 'app-create-shift-timing',
  templateUrl: './create-shift-timing.component.html',
  styleUrls: ['./create-shift-timing.component.scss']
})

export class CreateShiftTimingComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Active', 'Action'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Make sure to import MatPaginator
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  @ViewChild('closeModal') closeModal!: ElementRef
  input: any
  form: FormGroup | any;
  submitted!: boolean;
  constructor(private service: CommonService, private cdr: ChangeDetectorRef,
    private fb: FormBuilder, private router: Router, private loader: LoaderService) { }

  ngOnInit(): void {

    this.getShiftTimingList();
    this.formGroup();
  }
  formGroup() {
    this.form = this.fb.group({
      clstid: [null],
      schoolcode: localStorage.getItem('schoolcode'),
      timetable_Name: [null, Validators.required],
      clstacayear: localStorage.getItem('academicYear')
    })
  }
  get formControl() {
    return this.form.controls;
  }

  editRowIndex: number = -1;

  startEdit(index: number) {
    this.editRowIndex = index;
    this.service.getHttpServiceWithId('createShiftTiming', index, 'id').subscribe((response: any) => {
      if (response.status) {

      }
    })
  }

  cancelEdit() {
    this.editRowIndex = -1;
  }


  getShiftTimingList() {
    this.loader.show()
    this.dataSource = new MatTableDataSource([]);
    this.service.getHttpServiceWithId(localStorage.getItem('schoolcode'), 'getShiftTimingList', 'schoolcode').subscribe((response: any) => {
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
  onFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement)?.value
    console.log(filterValue);
    filterValue = filterValue!.trim(); // Remove whitespace
    filterValue = filterValue!.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  onAdd() {
    this.formGroup();
    this.submitted = false
  }
  onEdit(id: number) {
    this.formGroup();
    this.submitted = false
    let postData = {
      clstid: id,
      schoolcode: localStorage.getItem('schoolcode')
    }
    this.service.getHttpServiceWithDynamicParams(postData, 'findShiftTiming').subscribe((response: any) => {
      if (response.status) {
        this.form.patchValue({
          clstid: response.resultData[0].clstid,
          schoolcode: localStorage.getItem('schoolcode'),
          timetable_Name: response.resultData[0].timetable_Name,
          clstacayear: localStorage.getItem('academicYear')
        })
      }
    })
  }
  onDelete(id: number) {
    let postData = {
      CLSTID: id,
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear')
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
        this.service.deleteHttpService(postData, 'deleteShiftTiming').subscribe((response) => {
          const responseData = JSON.parse(response);
          console.log("delete", responseData);

          if (responseData.status) {
            Swal.fire({
              toast: true,
              showConfirmButton: false,
              timer: 1500,
              title: "Successfully deleted!",
              icon: "success",
              width: '350px',
              heightAuto: false
            });
            this.getShiftTimingList()
            this.cdr.markForCheck();
          } else {
            Swal.fire({ text: responseData.information.description });
            this.getShiftTimingList();
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getShiftTimingList();
      }
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      let body = { ...this.form.value };
      if (body.clstid == '' || body.clstid == null) {
        this.service.postHttpService(body, 'createShiftTiming').subscribe((response: any) => {
          if (response.status) {
            this.closeModal.nativeElement.click()
            Swal.fire({
              title: "Success",
              text: "Record saved successfully",
              icon: 'success',
              width: '350px',
              heightAuto: false
            }).then(() => {
              this.getShiftTimingList()
            });
          } else {
            Swal.fire({
              title: "Error",
              text: response.statusMessage,
              icon: 'warning',
              width: '350px',
              heightAuto: false
            })
          }
        })
      } else {
        let postData = {
          clstid: body.clstid,
          schoolcode: localStorage.getItem('schoolcode'),
          timetable_Name: body.timetable_Name,
        }
        this.service.postHttpService(postData, 'updateShiftTiming').subscribe((response: any) => {
          if (response.status) {
            this.closeModal.nativeElement.click()
            Swal.fire({
              title: "Success",
              text: "Record saved successfully",
              icon: 'success',
              width: '350px',
              heightAuto: false
            }).then(() => {
              this.getShiftTimingList()
            });

          } else {
            Swal.fire({
              title: "Error",
              text: response.statusMessage,
              icon: 'warning',
              width: '350px',
              heightAuto: false
            });
          }

        })
      }
    }
  }
  onAddShift(id: number, timtableName: string) {
    this.router.navigate(['/Addshift'], { state: { id: id, timetableName: timtableName } })
  }
}
