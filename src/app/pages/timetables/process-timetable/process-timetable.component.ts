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
  constructor( private service: CommonService, private fb: FormBuilder ,private sanitizer: DomSanitizer, private loader: LoaderService) { 
    
  }
  ngOnInit(): void {
    this.getProcessTimetableList();
  }
  getProcessTimetableList() {
    this.loader.show();
    let postData = {
      schoolcode: localStorage.getItem('schoolcode')
    }
    this.service.getHttpServiceWithDynamicParams(postData, 'ProcessTimetableList').subscribe((response: any) => {
      
      if (response.status) {
        this.timetableList = this.sanitizer.bypassSecurityTrustHtml(response.resultData);
        this.timetableName = response.timetableName;
        this. ttlPercentage = response.ttlPercentage
        this.loader.hide();
      }else {
        // Handle the case where no data is found
        this.timetableList = ''; // Set timetableList to null or an empty array, whichever you prefer
        this.timetableName = ''; // Clear the timetableName
        this.ttlPercentage = ''; // Clear the ttlPercentage
        this.loader.hide();
      }
    })
  }


}
