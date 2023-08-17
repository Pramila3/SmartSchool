
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  shiftForm!: FormGroup;
  shiftFormArr!: FormArray;

  toppings = new FormControl([]);
  searchValue = '';
  toppingList = ['LKG', '1 A', '1 B', '2 A', '2 B'];
  submitted!: boolean;
  colvalues: any = [];

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
    private fb: FormBuilder) { }

  ngOnInit() {
    this.shiftTimingId = history.state.id
    this.timetableName = history.state.timetableName
    if (this.shiftTimingId) {
      this.getShiftList(this.shiftTimingId);
      this.getClassList();
      this.formGroup();
    } else {
      this.router.navigate(['/CreateShiftTiming'])
    }
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
  get formControl() {
    const formArray = this.shiftForm.get('shiftFormArr') as FormArray;
    return formArray.controls
    // Now TypeScript recognizes the 'controls' property
  }
  getShiftList(id: number) {
    let postData = {
      classid: id,
      schoolcode: localStorage.getItem('schoolcode')
    }
    this.service.getHttpServiceWithDynamicParams(postData, 'getShiftList').subscribe((response: any) => {
      if (response.status) {
        this.shiftTimingList = response.resultData
      }
    })
  }
  getClassList() {
    let postData = {
      shiftclassid: this.shiftTimingId,
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
  onChangePeriod(){
    for (let j = 0; j < this.shiftForm.value.noOfPeriodsPerDay; j++) {
      this.colvalues.push({ col: "period" + j})
    }
  }
  showPeriods() {
    const arrayValue = this.toppings.value;
    if (Array.isArray(arrayValue)) {
      const arrayAsString = arrayValue.join(', ');
      console.log(arrayAsString);
      this.shiftForm.get('class')?.setValue(arrayAsString);
    }
    this.submitted = true;
    if (this.shiftForm.valid) {
      for (let i = 0; i < this.shiftForm.value.noOfdaysPerWeek; i++) {
        let arr = []
        let obj: { [key: string]: any } = {};
        for (let j = 0; j < this.shiftForm.value.noOfPeriodsPerDay; j++) {
          let period = 'period' + [j]
          arr.push(period);
        }
        arr.forEach(item => {
          obj[item] = '';
        });
        let ind = i + +(this.shiftForm.value.startingDay);
        if(ind==7){
          ind = ind - ind +1;
        }else if(i ==1){
           ind = +(this.shiftForm.value.startingDay) + 1
        }else{
          ind = ind + 1;
        }
        const newFormGroup = this.fb.group({
          day: (i==0 ? "day " +this.shiftForm.value.startingDay : "day " + ind), ...obj
        });
        const formArray = this.shiftForm.get('shiftFormArr') as FormArray;
        formArray.push(newFormGroup);
      }
      console.log(this.shiftForm.value);

    }
  }
}

