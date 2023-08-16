import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonService } from '../../services/common.service';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-shift-timing',
  templateUrl: './create-shift-timing.component.html',
  styleUrls: ['./create-shift-timing.component.scss']
})

export class CreateShiftTimingComponent implements AfterViewInit {
  displayedColumns: string[] = ['Name', 'Active', 'Action'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Make sure to import MatPaginator
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  input: any
  form!: FormGroup;
  submitted!: boolean;
  constructor(private service: CommonService, private cdr: ChangeDetectorRef,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.getShiftTimingList();
    this.formGroup();
  }
  formGroup() {
    this.form = this.fb.group({
      clstid: [null],
      schoolcode: localStorage['get']('schoolcode'),
      CLSTNAME: [null, Validators.required],
      CLSTISACTIVE: [null, Validators.required],
      CLSTACAYEAR: new Date().getFullYear()
    })
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  editRowIndex: number = -1;

  startEdit( index: number) {
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
    this.service.getHttpServiceWithId('testonline', 'getShiftTimingList', 'schoolcode').subscribe((response: any) => {
      if (response.status) {
        this.dataSource = new MatTableDataSource(response.resultData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
      }
    })
  }
  onFilter(filterValue: any) {
    console.log(filterValue);

    filterValue = filterValue.value.trim(); // Remove whitespace
    filterValue = filterValue.value.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      let body = { ...this.form.value };
      if (body.clstid == '' || body.clstid == null) {
        this.service.postHttpService(body, 'createShiftTiming').subscribe((response: any) => {
          if (response.status) {
            Swal.fire({
              title: "this.successTitle",
              text: "this.addmessage",
              icon: 'success',
            });
          } else {
            Swal.fire({
              title: "this.errorTitle",
              text: "res.message",
              icon: 'warning',
            });
          }
        })
      } else {
        this.service.postHttpService(body, 'updateShiftTiming').subscribe((response: any) => {
          if (response.status) {
            Swal.fire({
              title: "this.successTitle",
              text: "this.addmessage",
              icon: 'success',
            });
          } else {
            Swal.fire({
              title: "this.errorTitle",
              text: "res.message",
              icon: 'warning',
            });
          }
        })
      }
    }
  }
}
