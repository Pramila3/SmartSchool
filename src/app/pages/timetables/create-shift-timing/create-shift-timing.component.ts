import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-create-shift-timing',
  templateUrl: './create-shift-timing.component.html',
  styleUrls: ['./create-shift-timing.component.scss']
})

export class CreateShiftTimingComponent implements AfterViewInit {
  displayedColumns: string[] = ['Name', 'Active', 'Action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Make sure to import MatPaginator

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  editRowIndex: number = -1;

  startEdit(row: PeriodicElement, index: number) {
    this.editRowIndex = index;
  }

  cancelEdit() {
    this.editRowIndex = -1;
  }

  saveEdit(row: PeriodicElement, index: number) {
    // Perform saving logic here
    this.editRowIndex = -1;
  }


}
export interface PeriodicElement {
  Name: string;
  Active: string;


}
const ELEMENT_DATA: PeriodicElement[] = [
  { Name: 'Time Table 20212022', Active: 'In Active	', },
  { Name: 'Time Table new 2021-2022	', Active: 'In Active	', },
  { Name: 'TIME TABLE1		', Active: 'In Active	', },
  { Name: 'TT 2023		', Active: 'In Active	', },
  { Name: 'TT 2023-2024	', Active: 'Active	', },
  { Name: 'TT 2023-2024 I0		', Active: 'In Active	', },
  { Name: 'TT 2023-2024 II	', Active: 'In Active	', },
  { Name: 'TT 2023-2024 TT	', Active: 'In Active	', },
  { Name: 'TT NEW		', Active: 'In Active	', },


];