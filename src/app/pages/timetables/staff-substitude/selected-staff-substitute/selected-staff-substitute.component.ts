import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/pages/common/loading/loader.service';
import { CommonService } from 'src/app/pages/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-selected-staff-substitute',
  templateUrl: './selected-staff-substitute.component.html',
  styleUrls: ['./selected-staff-substitute.component.scss']
})
export class SelectedStaffSubstituteComponent implements OnInit {
  data: any;

  displayedColumns: string[] = ['code', 'name', 'subject', 'location', 'Action'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Make sure to import MatPaginator
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  loactionList: any = [];
  timetableList: any;
  showStaffView!: boolean;
  constructor(private service: CommonService, private router: Router,
    private loader: LoaderService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.data = history.state.data
    if (this.data) {
      this.getFreeStaffList();
      this.getLocationList();
    } else {
      this.router.navigate(['/timetable/AddStaffSubstitude'])
    }
  }
  getFreeStaffList() {
    this.loader.show()
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      ids: this.data.ids
    }
    this.service.getHttpServiceWithDynamicParams(postData, 'getFreeStaffList').subscribe((response: any) => {
      if (response.status) {
        this.dataSource = new MatTableDataSource(response.resultData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loader.hide()
      } else {
        this.loader.hide()
      }
    }, error => {
      this.loader.hide()
    })
  }

  getLocationList() {
    let postData = {
      schoolcode: localStorage.getItem('schoolcode')
    }
    this.service.getHttpServiceWithDynamicParams(postData, 'BindAllotSubject').subscribe((response) => {
      if (response.status) {
        this.loactionList = response.resultData;
      }
    })
  }
  onRoomChange(event: any, index: any) {
    this.dataSource.filteredData[index].roomId = event.target.value
  }
  onSubmit(element: any) {
    let id = this.data.ids + (element.staffno ? element.staffno : '')
    let subj
    if (element.staffno) {
      subj =  element.staffno + (element.subjectid ? '@' + element.subjectid : '')
    }
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      ids: id,
      stfsubid: subj,
      roomid: element.roomId
    }
    this.service.postHttpService(postData, 'saveStaffSubstitute').subscribe((response: any) => {
      if (response.status) {
        Swal.fire({
          title: "Success",
          text: "Record saved successfully",
          icon: 'success',
          width: '350px',
          heightAuto: false
        }).then(() => {
          // this.getShiftTimingList()
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
  }
  getStaffSubstitutionList(element: any) {
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      ids: this.data.ids,
      staffidname: element.staffno + '@' + element.staffName
    }
    this.loader.show()
    this.showStaffView = false
    this.service.getHttpServiceWithDynamicParams(postData, 'getStaffSubstituteDetails').subscribe((response: any) => {
      if (response.status) {
        this.timetableList = this.sanitizer.bypassSecurityTrustHtml(response.resultData);
        this.showStaffView = true
        this.loader.hide()
      } else {
        this.showStaffView = false
        this.loader.hide()
      }
    }, error => {
      this.loader.hide()
    })
  }
}
