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

  spans = [];
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
        // const processedData = this.processData(response.resultData);
        this.dataSource = new MatTableDataSource(response.resultData);
        // this.dataSource = new MatTableDataSource(processedData);
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

  processData(apiData: any[]): any[] {
    const processedData = [];

    for (let i = 0; i < apiData.length; i++) {
      const currentRow = apiData[i];

      // Check if there's a next row and if staff and subject match
      if (
        i < apiData.length - 1 &&
        currentRow.staff === apiData[i + 1].staff &&
        currentRow.subject === apiData[i + 1].subject
      ) {
        // Merge rows by increasing rowspan
        currentRow.rowspan = 2;
        currentRow.additionalData = apiData[i + 1].additionalData; // You can add more fields if needed
        i++; // Skip the next row as it's merged
      } else {
        // This row is not merged
        currentRow.rowspan = 1;
      }

      // Add the processed row to the result
      processedData.push(currentRow);
    }

    return processedData;
  }

  onDelete(id: string) {
    console.log('rsvid', id);

    let postData = {
      // CLSTID: id,
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear'),
      Reserveid: id,
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
        this.service.deleteHttpService(postData, 'DeleteFixCriteriaList').subscribe((response) => {
          console.log('deleteCriteriaList', response);

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
  onEdit(data: any){
    if(data.rsvid){
      let splitdata = data.rsvid.split('@');
      console.log(splitdata);
      
      this.router.navigate(['/timetable/AddFixCriteria'], {state: {id: splitdata[0], classId: splitdata[1], subjectId: splitdata[2], staffId: splitdata[3], type: data.type}})
    }
  }

  cacheSpan(key: any, accessor: any) {
    for (let i = 0; i < this.dataSource.length;) {
      let currentValue = accessor(this.dataSource[i]);
      let count = 1;

      // Iterate through the remaining rows to see how many match
      // the current value as retrieved through the accessor.
      for (let j = i + 1; j < this.dataSource.length; j++) {        
        if (currentValue != accessor(this.dataSource[j])) {
          break;
        }

        count++;
      } 

      // if (!this.spans[i]) {
      //   this.spans[i] = {};
      // }

      // // Store the number of similar values that were found (the span)
      // // and skip i to the next unique row.
      // this.spans[i][key] = count;
      // i += count;
    }
  }

  getRowSpan(col: any, index: any) {
    console.log(this.spans)
    return this.spans[index] && this.spans[index][col];
  }
}



