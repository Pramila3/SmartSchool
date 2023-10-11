import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/pages/services/common.service';

@Component({
  selector: 'app-add-staff-combined-criteria',
  templateUrl: './add-staff-combined-criteria.component.html',
  styleUrls: ['./add-staff-combined-criteria.component.scss']
})
export class AddStaffCombinedCriteriaComponent implements OnInit {

  toppings = new FormControl('');
  toppingList: string[] = ['JKG A - ENG-II - ANANDA DAS S B (BSMS63)', 'JKG A - READ - ABDULHALIM (BKMHSS136)', 'JKG A - TT - AGNES SHYLINE NISHA I (BKS1714)'];

  classlist = new FormControl('');
  classesList: any = [];
  subjectList: any = [];
  staffList: any;
  stafftList: any = [];

  selectedValue1: string | undefined;

  selectedValue2: string | undefined;

  form!: FormGroup | any;
  searchValue: string = '';
  searchValue1: string = '';
  searchValue2: string = '';

  constructor(private commonService: CommonService, private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getClassList();
    this.formGroup();
  }
  formGroup() {
    this.form = this.fb.group({
      class: [null, Validators.required],
      subject: [null, Validators.required],
      staff: [null, Validators.required]
    })
  }

  get filteredClassList() {
    const lowerCaseSearch = this.searchValue.toLowerCase();
    return this.classesList.filter((element: any) => element.class.toLowerCase().includes(lowerCaseSearch));
  }
  get filteredSubjectList() {
    const lowerCaseSearch = this.searchValue1.toLowerCase();
    return this.subjectList.filter((element: any) => element.subjectCode.toLowerCase().includes(lowerCaseSearch));
  }
  get filteredStaffList() {
    const lowerCaseSearch = this.searchValue2.toLowerCase();
    return this.stafftList.filter((element: any) => element.staff?.toLowerCase().includes(lowerCaseSearch));
  }
  applyShiftFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchValue = inputValue;
  }
  applySubjectFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchValue1 = inputValue;
  }
  applyStaffFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchValue2 = inputValue;
  }
  getSubjectList() {
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear'),
      classid: this.form.value.class

    }
    this.commonService.getHttpServiceWithDynamicParams(postData, 'getDefineSubjectDropDown').subscribe(response => {
      if (response.status) {
        this.subjectList = response.resultData
      }
    })
  }
  getClassList() {
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear'),
    }
    this.commonService.getHttpServiceWithDynamicParams(postData, 'getDefineClassDropDown').subscribe(response => {
      if (response.status) {
        this.classesList = response.resultData
      }
    })
  }
  getStaffList() {
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear'),
      classid: this.form.value.class,
      subjectid: this.form.value.subject
    }
    this.commonService.getHttpServiceWithDynamicParams(postData, 'getDefineStaffDropDown').subscribe(response => {
      if (response.status) {
        this.stafftList = response.resultData
        this.stafftList.map((x: any) => ({ ...x, disabled: true }));
        if (response.statusMessage != '') {
          let splitValue = response.statusMessage.split(',')
          let arr: any[] = []
          splitValue.forEach((element: any) => {
            let check = this.stafftList.find((data: any) => data.staffNo == element)
            console.log(check);
            
            if (check) {
              arr.push(check.staff);
              check.disabled = true
            }else{
              check.disabled = false
            }
            this.form.patchValue({
              staff: arr
            })
            // this.form.get('staff').setValue(arr);
            console.log(this.form);
            this.cdr.detectChanges()
          });
        }
      }
    })
  }
  getBindPeriodsList() {

  }

}
