import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { LoaderService } from '../../common/loading/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-replacement',
  templateUrl: './staff-replacement.component.html',
  styleUrls: ['./staff-replacement.component.scss']
})
export class StaffReplacementComponent implements OnInit {

  selectedValue: string | undefined;
  selectedValuereplace: string | undefined

  input: any
  form: FormGroup | any;
  submitted!: boolean;
  BindStaffList: any;
  ttlPercentage: any;
  BindStaffReplaceList: any;
  BindGridList: any;
  staffNo: any;
  value: any;
  BindList: any;
  constructor(private router: Router, public dialog: MatDialog, private service: CommonService, private fb: FormBuilder, private loader: LoaderService) { }


  ngOnInit(): void {
    this.formGroup();
    this.getBindStaffList();
    this.getBindReplaceStaffList();
    // this.getBindGridList()
  }
  formGroup() {
    this.form = this.fb.group({
      Staff: [null, Validators.required],
      replace: [null, Validators.required],
    })
  }
  getBindStaffList() {
    this.loader.show()
    let postData = {
      schoolcode: localStorage.getItem('schoolcode')
    }

    this.service.getHttpServiceWithDynamicParams(postData, 'getBindStaffList').subscribe(
      (response: any) => {
        console.log('getBindStaffList', response);

        if (response.statusCode == 200) {
          // this.BindStaffList = response.resultData[0].staff
          this.BindStaffList = response.resultData
          // ?.map((staff: { staff: any; }) => {
          //   return staff.staff
          // })
          this.ttlPercentage = response.ttlPercentage
          console.log('getBindStaffList', response, this.BindStaffList);
          this.loader.hide()
        }
      },

    );
  }
  getBindReplaceStaffList() {
    this.loader.show()
    let postData = {
      schoolcode: localStorage.getItem('schoolcode')
    }

    this.service.getHttpServiceWithDynamicParams(postData, 'getBindReplaceStaffStaffList').subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          // this.BindList = response.resultData
          // console.log('BindList' , this.BindList);
          
          this.BindStaffReplaceList = response.resultData
          console.log('BindStaffReplaceList-----' , this.BindStaffReplaceList);
          
          // ?.map((staff: { staff: any; }) => {
          //   return staff.staff;
          // })
          this.loader.hide()
        }
      },

    );
  }
  getBindGridList(value: any) {
    console.log(value);

    this.loader.show()
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      staffid: value

    }

    this.service.getHttpServiceWithDynamicParams(postData, 'getBindGridList').subscribe(
      (response: any) => {
        console.log('getBindGridList', response);

        if (response.statusCode == 200) {
          this.BindGridList = response.resultData
          this.loader.hide()
        }
      },

    );
  }

  replacestafbtn() {

    this.loader.show()
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      staff : this.form.value.Staff,
      replacestaff : this.form.value.replace
    }
// console.log('BindStaffReplaceList' , this.form.value.Staff,this.form.value.replace,postData);

    this.service.postHttpService(postData, 'ClickReplaceStaff').subscribe(
      (response: any) => {
        console.log('replacestafbtn', response);
        if (response.statusCode == 200) {
          this.loader.hide()
          Swal.fire({
            title: "Success",
            text: "Record Replaced successfully",
            icon: 'success',
            width: '350px',
            heightAuto: false
          }).then(() => {
            this.getBindGridList
          });

        } else {
          this.loader.hide()
          Swal.fire({
            title: "Error",
            text: response.statusMessage,
            icon: 'warning',
            width: '350px',
            heightAuto: false
          });
        }
      },

    );
  }
  Staff: Staff[] = [
    { value: '1', viewValue: 'ANTONY BENITOR J  (BSMS32)' },
    { value: '2', viewValue: 'ARUN  (BKMS0075)' },
    { value: '3', viewValue: 'AHASTHILINGAM PILLAI  (BKMS0107)' },

  ];

  Replace: Replace[] = [
    { value: '1', viewValue: 'ABDULHALIM  (BKMHSS136)' },
    { value: '2', viewValue: 'AHILA S (BKMHSS20)' },
    { value: '3', viewValue: 'AGNES SHYLINE NISHA I (BKS1714)' },
    { value: '4', viewValue: 'AJITHKUMAR K  (BKMS0020)' },
    { value: '5', viewValue: 'ANANDA DAS S B  (BSMS63)' },
    { value: '6', viewValue: 'ANANTH K (BKMS0009)' },
    { value: '7', viewValue: 'ANANTH S (BKMS0099)' },
  ];
}

interface Staff {
  value: string;
  viewValue: string;
}

interface Replace {
  value: string;
  viewValue: string;
}