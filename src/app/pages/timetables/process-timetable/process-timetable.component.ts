import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonService } from '../../services/common.service';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoaderService } from '../../common/loading/loader.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-process-timetable',
  templateUrl: './process-timetable.component.html',
  styleUrls: ['./process-timetable.component.scss']
})
export class ProcessTimetableComponent implements OnInit {
  // timetableList: any =[] ;
  timetableList: SafeHtml | undefined;
  timetableName: any;
  ttlPercentage: any;
  shiftId: any
  shiftList: any = []
  constructor(private service: CommonService, private fb: FormBuilder, private sanitizer: DomSanitizer, private loader: LoaderService , private cdr: ChangeDetectorRef ,) {

  }
  ngOnInit(): void {
    // this.getProcessTimetable();
    this.getShiftList()
    // this.getProcessTimetableList();

  }

  getProcessTimetableList() {
    this.loader.show();
    let postData = {
      schoolcode: localStorage.getItem('schoolcode') ,sftid : this.shiftId
    }

    this.service.getHttpServiceWithDynamicParams(postData, 'ProcessTimetableList').subscribe(
      (response: any) => {
        if (response.status) {
          this.timetableList = this.sanitizer.bypassSecurityTrustHtml(response.resultData);
          this.timetableName = response.timetableName;
          this.ttlPercentage = response.ttlPercentage;
          this.loader.hide();
        } else {
          // Handle the case where no data is found
          this.timetableList = ''; // Set timetableList to null or an empty array, whichever you prefer
          this.timetableName = ''; // Clear the timetableName
          this.ttlPercentage = ''; // Clear the ttlPercentage
          this.loader.hide();
        }
      },
      (error) => {
        // Handle API error here and show an alert
        console.error('API Error:', error);
        this.loader.hide();

        // Show an alert using a library like Swal (SweetAlert2) or your preferred alert mechanism
        Swal.fire({
          title: "API Error",
          text: "An error occurred while fetching data from the API.",
          icon: 'error',
          // timer: 3000 // Adjust the timer as needed
        });
      }
    );
  }
  getShiftList() {
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'), 
    }
    this.service.getHttpServiceWithDynamicParams(postData, 'getCombinedShiftList').subscribe(response => {
      if (response.status) {
        this.shiftList = response.resultData
        this.shiftId = this.shiftList.length > 0 ? this.shiftList[0].sftid : '';
        console.log(this.shiftId);
        
       }
    this.getProcessTimetableList();
    this.cdr.detectChanges()    

    })
  }

  getProcessTimetable() {
    this.loader.show();
   
    
    let postData = {
      schoolcode: localStorage.getItem('schoolcode') 
    }

    this.service.postHttpService(postData, 'ProcessTimetable').subscribe(
      (response: any) => {

        if (response.statusCode == 200) {

          this.getProcessTimetableList()
          this.loader.hide();
        }
        else {
          this.loader.hide();
        }
      }

    );
  }

}
