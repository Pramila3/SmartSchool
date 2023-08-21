
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/pages/common/loading/loader.service';
import { CommonService } from 'src/app/pages/services/common.service';


@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss'],

})
export class AddShiftComponent implements OnInit {
  shiftTimingId!: number;
  shiftTimingList: any = [];
  timetableName!: string;
  isAddShiftShow = false
  classList: any = [];
  activeStatus!: any;
  ischecked!: any;


  shiftForm!: FormGroup;
  shiftFormArr!: FormArray;
  periodForm!: FormGroup;

  toppings = new FormControl([]);
  searchValue = '';
  toppingList = ['LKG', '1 A', '1 B', '2 A', '2 B'];
  submitted!: boolean;
  colvalues: any = [];
  status: any;
  dayList: any = [];

  @ViewChild('openModal') openModal!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;

  get filteredClassList() {
    const lowerCaseSearch = this.searchValue.toLowerCase();
    return this.classList.filter((element: any) => element.class.toLowerCase().includes(lowerCaseSearch));
  }

  get selectedToppingsText() {
    const selectedToppings = this.toppings.value || [];
    if (selectedToppings.length === 0) {
      return '';
    } else if (selectedToppings.length === 1) {
      return selectedToppings[0];
    } else {
      return `${selectedToppings[0]} (+${selectedToppings.length - 1} others)`;
    }
  }

  applyFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchValue = inputValue;
    console.log(this.searchValue);

  }
  constructor(private service: CommonService, private router: Router,
    private fb: FormBuilder, private loader: LoaderService) { }

  ngOnInit() {
    this.shiftTimingId = history.state.id
    this.timetableName = history.state.timetableName
    this.status = history.state.status
    console.log(this.status);

    if (this.shiftTimingId) {
      this.getShiftList(this.shiftTimingId);
      this.getClassList();
      this.formGroup();
      this.getDayList();
      if (this.status == 'Active') {
        this.ischecked = true
        this.activeStatus = true
      }
    } else {
      this.router.navigate(['/CreateShiftTiming'])
    }
    this.periodFormGroup()
  }
  formGroup() {
    this.shiftForm = this.fb.group({
      shiftName: [null, Validators.required],
      class: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      noOfdaysPerWeek: [null, Validators.required],
      noOfPeriodsPerDay: [null, Validators.required],
      startingDay: [null, Validators.required],
      shiftFormArr: this.fb.array([])
    })
  }
  periodFormGroup() {
    this.periodForm = this.fb.group({
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      periodType: ["Period", Validators.required],
      periodName: [null],
      periodIndex: [null]
    })
  }
  get formControl() {
    const formArray = this.shiftForm.get('shiftFormArr') as FormArray;
    return formArray.controls
    // Now TypeScript recognizes the 'controls' property
  }
  getShiftList(id: number) {
    this.loader.show();
    let postData = {
      timetableid: id,
      schoolcode: localStorage.getItem('schoolcode')
    }
    this.service.getHttpServiceWithDynamicParams(postData, 'getShiftList').subscribe((response: any) => {
      if (response.status) {
        this.loader.hide();
        this.shiftTimingList = response.resultData
      } else {
        this.loader.hide();
      }
    }, error => {
      this.loader.hide();
    });
  }
  getClassList() {
    let postData = {
      shiftclstimetableid: this.shiftTimingId,
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: "2022"
    }
    this.service.getHttpServiceWithDynamicParams(postData, 'getClassDropDownList').subscribe((response: any) => {
      if (response.status) {
        this.classList = response.resultData
      }
    })
  }
  addShift() {
    this.isAddShiftShow = true;
  }
  onChangePeriod() {
    for (let j = 0; j < this.shiftForm.value.noOfPeriodsPerDay; j++) {
      this.colvalues.push({ col: "period" + j })
    }
  }
  getDayList() {
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
    }
    this.service.getHttpServiceWithDynamicParams(postData, 'getDayList').subscribe((response: any) => {
      if (response.status) {
        this.dayList = response.resultData
      }
    })
  }
  showPeriods() {
    let formArray = this.shiftForm.get('shiftFormArr') as FormArray;
    formArray.clear()
    const arrayValue = this.toppings.value;
    if (Array.isArray(arrayValue)) {
      const arrayAsString = arrayValue.join(', ');
      console.log(arrayAsString);
      this.shiftForm.get('class')?.setValue(arrayAsString);
    }
    this.submitted = true;
    if (this.shiftForm.valid) {
      let dayArr = (this.shiftForm.value.startingDay).split('@')
      console.log(dayArr);

      for (let i = 0; i < this.shiftForm.value.noOfdaysPerWeek; i++) {
        let arr = []
        let obj: { [key: string]: any } = {};
        for (let j = 0; j < this.shiftForm.value.noOfPeriodsPerDay; j++) {
          let period = 'period' + [j]
          arr.push(period);
        }
        arr.forEach(item => {
          obj[item] = this.fb.array([this.fb.group({ startTime: '', endTime: '', periodType: '' })]);
        });

        const newFormGroup = this.fb.group({
          day: dayArr[i], ...obj
        });
        const formArray = this.shiftForm.get('shiftFormArr') as FormArray;
        formArray.push(newFormGroup);
      }
      console.log(this.shiftForm.value);

    }
  }
  onChangeStatus() {
    console.log(this.ischecked);
    let postData = {
      clstid: this.shiftTimingId,
      schoolcode: localStorage.getItem('schoolcode'),
    }
    this.service.postHttpService(postData, 'shiftActiveStatus').subscribe((response: any) => {
      if (response.status) {
        this.ischecked = true
      }
    })
  }
  addPeriods(formValue: any, colValue: any, i: number) {
    console.log(formValue);
    console.log(colValue);
    console.log(i);
    this.periodForm.patchValue({
      periodName: colValue,
      periodIndex: i,
      startTime: formValue.value[colValue][0].startTime,
      endTime: formValue.value[colValue][0].endTime,
      periodType: formValue.value[colValue][0].periodType ? formValue.value[colValue][0].periodType : 'Period',
    })
  }
  createTiming() {
    console.log(this.periodForm.value);
    const nestedArray = this.shiftForm.get('shiftFormArr') as FormArray;

    let shiftObject = this.shiftForm.value.shiftFormArr[this.periodForm.value.periodIndex];
    console.log(shiftObject);
    if (shiftObject) {
      
      let periodObj = shiftObject[this.periodForm.value.periodName][0];     

      if (periodObj.startTime && periodObj.endTime) {
        periodObj.startTime = this.periodForm.value.startTime
        periodObj.periodType = this.periodForm.value.periodType
        periodObj.endTime = this.periodForm.value.endTime
        const period2Controls = (nestedArray.at(this.periodForm.value.periodIndex).get(this.periodForm.value.periodName) as FormArray).at(0) as FormGroup;
        period2Controls.patchValue(periodObj);
      } else {
        periodObj.startTime = this.periodForm.value.startTime
        periodObj.periodType = this.periodForm.value.periodType
        periodObj.endTime = this.periodForm.value.endTime
        for (let i = 0; i < +(this.shiftForm.value.noOfdaysPerWeek); i++) {
          const period2Controls = (nestedArray.at(i).get(this.periodForm.value.periodName) as FormArray).at(0) as FormGroup;
          period2Controls.patchValue(periodObj);
        }
      }
      this.closeModal.nativeElement.click()
    }
  }
}

