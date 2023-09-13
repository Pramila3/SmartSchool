import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/pages/common/loading/loader.service';
import { CommonService } from 'src/app/pages/services/common.service';

@Component({
  selector: 'app-add-fix-criteria',
  templateUrl: './add-fix-criteria.component.html',
  styleUrls: ['./add-fix-criteria.component.scss']
})
export class AddFixCriteriaComponent implements OnInit {
  selectedValue1: string | undefined;
  selectedValue2: string | undefined;
  selectedValue3: string | undefined;
  classList: any = [];
  subjectList: any = [];
  staffList: any = [];
  form: FormGroup | any;
  searchValue = '';
  classid = '';
  constructor(private service: CommonService, private router: Router, private cdr: ChangeDetectorRef,
    private fb: FormBuilder, private loader: LoaderService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getClassList()

  }
  formGroup() {
    this.form = this.fb.group({

      classes: [],
      subjectList: [],
      staffs: []
    })
  }

  getClassList() {
    this.loader.show()
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: "2022",

    }
    this.service.getHttpServiceWithDynamicParams(postData, 'getclassList').subscribe((response: any) => {
      if (response.status) {
        this.classList = response.resultData
        console.log('classlistres', response.resultData);
        // this.loader.hide()
        this.loader.hide()
      }
    })
  }
  getSubjectList(classid: any) {
    this.classid = classid
    console.log('classid' ,classid);
    
    this.loader.show()
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: "2022",
      classid: classid
    }
    this.service.getHttpServiceWithDynamicParams(postData, 'getSubjectList').subscribe((response: any) => {
      if (response.status) {
        this.subjectList = response.resultData
        console.log('subjectlistres', response.resultData);
        this.loader.hide()

      }
    })
  }

  getStaffList(subjectid: any) {
    console.log('subjectid', subjectid);

    this.loader.show()
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: "2023",
      classid: this.classid,
      subjectid: subjectid

    }
    
    this.service.getHttpServiceWithDynamicParams(postData, 'getStaffList').subscribe((response: any) => {
      console.log('stafflistres', response);

      if (response.status) {
        this.staffList = response.resultData
        console.log('stafflistres', response.resultData);
        this.loader.hide()

      }
    })
  }

  get filteredClassList() {
    const lowerCaseSearch = this.searchValue.toLowerCase();
    return this.classList.filter((element: any) => element.class.toLowerCase().includes(lowerCaseSearch));
  }
  // get filteredSubjectList() {
  //   const lowerCaseSearch = this.searchValue.toLowerCase();
  //   return this.subjectList.filter((element: any) => element.class.toLowerCase().includes(lowerCaseSearch));
  // }
  classes: classes[] = [
    { value: '11 A', viewValue: '11 A' },
    { value: '10 B', viewValue: '10 B' },
    { value: '2 A', viewValue: '2 A' },
    { value: '2 B', viewValue: '2 B' },
    { value: '3 A', viewValue: '3 A' },

  ];
  subjects: subjects[] = [
    { value: 'Tamil', viewValue: 'Tamil' },
    { value: 'English', viewValue: 'English' },
    { value: 'Science', viewValue: 'Science' },
    { value: 'Maths', viewValue: 'Maths' },
    { value: 'Social', viewValue: 'Social' },

  ];
  staffs: staffs[] = [
    { value: 'ANTO MEDAT  (BKMS0100)', viewValue: 'ANTO MEDAT  (BKMS0100)' },
    { value: 'MEDAT (BKMS0100)', viewValue: 'MEDAT (BKMS0100)' },
    { value: 'ANTO (BKMS0100)', viewValue: 'ANTO (BKMS0100)' },
  ];



}
interface classes {
  value: string;
  viewValue: string;
}

interface subjects {
  value: string;
  viewValue: string;
}
interface staffs {
  value: string;
  viewValue: string;
}