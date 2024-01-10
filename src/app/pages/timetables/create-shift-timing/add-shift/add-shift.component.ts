
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/pages/common/loading/loader.service';
import { CommonService } from 'src/app/pages/services/common.service';
import Swal from 'sweetalert2';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';


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

  classFormControl = new FormControl([], Validators.required);
  searchTextboxControl = new FormControl();
  searchValue = '';
  toppingList = ['LKG', '1 A', '1 B', '2 A', '2 B'];
  submitted!: boolean;
  colvalues: any = [];
  status: any;
  dayList: any = [];

  @ViewChild('openModal') openModal!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('modalPopup', { static: true }) modalPopup!: TemplateRef<any>;
  @ViewChild('picker') picker!: NgxMaterialTimepickerComponent;
  @ViewChild('picker1') picker1!: NgxMaterialTimepickerComponent;

  dayValue: any;
  timeErr!: boolean;
  startTime: any;
  modalTarget!: string;
  classSelectedValues: any = []
  @ViewChild('search') searchTextBox!: ElementRef;

  get filteredClassList() {
    const lowerCaseSearch = this.searchValue.toLowerCase();
    this.setSelectedClassValues();
    this.classFormControl.patchValue(this.classSelectedValues);
    return this.classList.filter((element: any) => element.class.toLowerCase().includes(lowerCaseSearch));
  }

  get selectedToppingsText() {
    const selectedToppings = this.classFormControl.value || [];
    if (selectedToppings.length === 0) {
      return '';
    } else if (selectedToppings.length === 1) {
      return selectedToppings[0];
    } else {
      return `${selectedToppings[0]} (+${selectedToppings.length - 1} others)`;
    }
  }
  openTimePicker() {
    this.picker.open();
  }
  openTimePickerend() {
    this.picker1.open();
  }
  applyFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchValue = inputValue;
    console.log("called");


  }
  constructor(private service: CommonService, private router: Router, private cdr: ChangeDetectorRef,
    private fb: FormBuilder, private loader: LoaderService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.shiftTimingId = history.state.id
    this.timetableName = history.state.timetableName
    this.status = history.state.status

    if (this.shiftTimingId) {
      this.formGroup();
      this.getShiftList(this.shiftTimingId);
      this.getClassList();
      this.getDayList();
      if (this.status == 'Active') {
        this.ischecked = true
        this.activeStatus = true
      }
    } else {
      this.router.navigate(['/timetable/CreateShiftTiming'])
    }
    this.periodFormGroup()
  }
  formGroup() {
    this.shiftForm = this.fb.group({
      shiftId: [null],
      shiftName: [null, Validators.required],
      class: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      noOfdaysPerWeek: [null, [Validators.required, Validators.pattern('^[0-9]$'), Validators.min(1)]],
      noOfPeriodsPerDay: [null, [Validators.required, Validators.min(1)]],
      startingDay: [null, Validators.required],
      saveType: 'add',
      shiftFormArr: this.fb.array([])
    }, { validator: timeRangeValidator })
  }
  // Custom validator function for maxlength
  singleLengthValidator(event: any) {
    // console.log('eventinput', event);
    // event.target.value = Math.max(), Math.min(1, Number(event.target.value));
  }
  doubleLengthValidator(event: any) {
    // const inputValue = Number(event.target.value);

    // if (!isNaN(inputValue)) {
    //   inputValue.toString().length<=1 ? (event.target.value = event.target.value.slice(0,1)) : (event.target.value = this.shiftForm.controls['noOfPeriodsPerDay'].setValue(0))
    // } else {
    //   event.target.value = '';
    // }
  }
  periodFormGroup() {
    this.periodForm = this.fb.group({
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      periodType: ["Period", Validators.required],
      periodName: [null],
      periodIndex: [null]

    }, { validator: timeRangeValidator2 })
  }
  get formControl() {
    const formArray = this.shiftForm.get('shiftFormArr') as FormArray;
    return formArray.controls
    // Now TypeScript recognizes the 'controls' property
  }
  get shiftFormArray() {
    return this.shiftForm.get('shiftFormArr') as FormArray;
    // Now TypeScript recognizes the 'controls' property
  }
  get shiftFormControl() {
    return this.shiftForm.controls;
  }
  get periodFormControl() {
    return this.periodForm.controls;
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
      academicyear: localStorage.getItem('academicYear'),
      isadd: this.shiftForm.value.shiftId ? 1 : 0
    }
    this.service.getHttpServiceWithDynamicParams(postData, 'getClassDropDownList').subscribe((response: any) => {
      if (response.status) {
        this.classList = response.resultData
      }
    })
  }
  addShift() {
    this.formGroup()
    this.getClassList()
    this.periodFormGroup()
    this.colvalues = []
    this.classFormControl = new FormControl([], Validators.required)
    this.isAddShiftShow = true;

  }
  onChangePeriod(event: any) {
    console.log("called", event.target.value);

    this.colvalues = []
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
    this.timeErr = false
    const arrayValue = this.classFormControl.value;
    if (Array.isArray(arrayValue)) {
      const arrayAsString = arrayValue.join(', ');
      this.shiftForm.get('class')?.setValue(arrayAsString);
    }
    this.submitted = true;
    if (this.shiftForm.controls['shiftName'].valid && this.shiftForm.controls['class'].valid &&
      this.shiftForm.controls['startTime'].valid && this.shiftForm.controls['endTime'].valid &&
      this.shiftForm.controls['noOfdaysPerWeek'].valid && this.shiftForm.controls['noOfPeriodsPerDay'].valid
      && this.shiftForm.controls['startingDay'].valid) {
      let dayArr = (this.shiftForm.value.startingDay).split('@')
      if (!this.shiftForm.value.shiftId) {
        // formArray.clear()
        for (let i = 0; i < this.shiftForm.value.noOfdaysPerWeek; i++) {
          let arr = []
          let obj: { [key: string]: any } = {};
          for (let j = 0; j < this.shiftForm.value.noOfPeriodsPerDay; j++) {
            let period = 'period' + [j]
            arr.push(period);
          }
          arr.forEach(item => {
            obj[item] = this.fb.array([this.fb.group({ startTime: ['', Validators.required], endTime: ['', Validators.required], periodType: ['', Validators.required] })]);
          });

          const newFormGroup = this.fb.group({
            day: dayArr[i], ...obj
          });
          const formArray = this.shiftForm.get('shiftFormArr') as FormArray;
          formArray.push(newFormGroup);
        }
      } 
      // else {
      //   let columnLength: number

      //   // this.colvalues = []
      //   // for (let j = 0; j < this.shiftForm.value.noOfPeriodsPerDay; j++) {
      //   //   this.colvalues.push({ col: "period" + j })
      //   // }

      //   let dayArr = (this.shiftForm.value.startingDay).split('@')
      //   console.log(this.shiftForm.value.shiftFormArr);

      //   for (let i = 0; i < this.shiftForm.value.noOfdaysPerWeek; i++) {
      //     if (i >= this.shiftForm.value.shiftFormArr.length) {
      //       let obj: { [key: string]: any } = {};
      //       this.colvalues.forEach((element2: any, j: number) => {
      //         obj[element2.col] = this.fb.array([this.fb.group({ startTime: ['', Validators.required], endTime: ['', Validators.required], periodType: ['', Validators.required] })]);
      //       })
      //       this.shiftFormArray.push(this.fb.group({
      //         day: dayArr[i], ...obj
      //       }))
      //       // const newFormGroup = this.fb.group({
      //       //   day: dayArr[i], ...obj
      //       // });
      //       // const formArray = this.shiftForm.get('shiftFormArr') as FormArray;
      //       // formArray.push(newFormGroup);
      //     }
      //   }
      //   this.shiftForm.value.shiftFormArr.forEach((element: any, i: number) => {
      //     columnLength = Object.keys(element).length - 1;
      //     if (columnLength != this.colvalues.length) {
      //       let lendiff = this.colvalues.length - columnLength;
      //       this.colvalues.forEach((element2: any, j: number) => {
      //         if (j >= columnLength) {
      //           let obj: { [key: string]: any } = {};
      //           element[element2.col] = [{ startTime: ['', Validators.required], endTime: ['', Validators.required], periodType: ['', Validators.required] }];

      //         }
      //       });

      //     }
      //   });
      // }
      else {
        let columnLength: number
        let dayArr = (this.shiftForm.value.startingDay).split('@')
        for (let i = 0; i < this.shiftForm.value.noOfdaysPerWeek; i++) {
          if (i >= this.shiftFormArray.value.length) {
            let obj: { [key: string]: any } = {};
            this.colvalues.forEach((element2: any, j: number) => {
              obj[element2.col] = this.fb.array([this.fb.group({ startTime: ['', Validators.required], endTime: ['', Validators.required], periodType: ['', Validators.required] })]);
            })
            this.shiftFormArray.push(this.fb.group({
              day: dayArr[i], ...obj
            }))
          }
        }
        this.shiftFormArray.value.forEach((element: any, i: number) => {
          columnLength = Object.keys(element).length - 1;
          if (columnLength != this.colvalues.length) {
            let lendiff = this.colvalues.length - columnLength;
            this.colvalues.forEach((element2: any, j: number) => {
              if (j >= columnLength) {
                let obj: { [key: string]: any } = {};
                element[element2.col] = [{ startTime: ['', Validators.required], endTime: ['', Validators.required], periodType: ['', Validators.required] }];
                // element.push(obj)
                // this.shiftFormArray.insert(i, this.fb.group(obj))
              }
            });

          }
        });
      }
      this.periodForm.get('startTime')?.setValue(this.shiftForm.value.startTime)

    }
  }
  onChangeStatus() {
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
    this.timeErr = false
    // console.log(formValue);
    // console.log(colValue);
    // console.log(i);
    // let shour = (formValue.value[colValue][0].startTime.split(':'))[0] > 12 ? 'PM' : 'AM'
    // let ehour = (formValue.value[colValue][0].endTime.split(':'))[0] > 12 ? 'PM' : 'AM'
    // if (formValue.value[colValue][0].startTime && formValue.value[colValue][0].endTime && formValue.value[colValue][0].periodType) {
    this.periodForm.patchValue({
      endTime: null
    })

    let sTime = formValue.value[colValue][0].startTime ? this.convertTo24HourFormat(formValue.value[colValue][0].startTime) : '';
    let eTime = formValue.value[colValue][0].endTime ? this.convertTo24HourFormat(formValue.value[colValue][0].endTime.trim()) : '';
    if (formValue.value[colValue][0].startTime && formValue.value[colValue][0].endTime) {
      this.periodForm.patchValue({
        periodName: colValue,
        periodIndex: i,
        startTime: sTime,
        endTime: eTime,
        periodType: formValue.value[colValue][0].periodType ? formValue.value[colValue][0].periodType : 'Period',
      })
    } else if (this.periodForm.value.startTime) {
      let sTime = this.periodForm.value.startTime ? this.convertTo24HourFormat(this.periodForm.value.startTime) : '';
      this.periodForm.patchValue({
        periodName: colValue,
        periodIndex: i,
        startTime: sTime,
      })
    } else {
      let sTime = this.shiftForm.value.startTime ? this.convertTo24HourFormat(this.shiftForm.value.startTime) : '';
      this.periodForm.patchValue({
        periodName: colValue,
        periodIndex: i,
        startTime: sTime,
      })
    }
    console.log(this.periodForm.value);

    // }
  }
  createTiming() {
    this.periodForm.patchValue({
      startTime: this.periodForm.value.startTime ? this.convertTo24HourFormat(this.periodForm.value.startTime) : null,
      endTime: this.periodForm.value.endTime ? this.convertTo24HourFormat(this.periodForm.value.endTime) : null
    })
    const nestedArray = this.shiftForm.get('shiftFormArr') as FormArray;

    let shiftObject = this.shiftForm.value.shiftFormArr[this.periodForm.value.periodIndex];
    if (shiftObject) {

      let periodObj = shiftObject[this.periodForm.value.periodName][0];

      if (periodObj.startTime && periodObj.endTime || this.shiftForm.value.saveType == 'edit') {
        periodObj.startTime = this.periodForm.value.startTime ? this.convertToAmPmFormat(this.periodForm.value.startTime) : null
        periodObj.periodType = this.periodForm.value.periodType
        periodObj.endTime = this.periodForm.value.endTime ? this.convertToAmPmFormat(this.periodForm.value.endTime) : null
        const period2Controls = (nestedArray.at(this.periodForm.value.periodIndex).get(this.periodForm.value.periodName) as FormArray).at(0) as FormGroup;
        period2Controls.patchValue(periodObj);
      } else {
        this.startTime = ''
        periodObj.startTime = this.periodForm.value.startTime ? this.convertToAmPmFormat(this.periodForm.value.startTime) : ''
        periodObj.periodType = this.periodForm.value.periodType
        periodObj.endTime = this.periodForm.value.endTime ? this.convertToAmPmFormat(this.periodForm.value.endTime) : ''
        for (let i = 0; i < +(this.shiftForm.value.noOfdaysPerWeek); i++) {
          const period2Controls = (nestedArray.at(i).get(this.periodForm.value.periodName) as FormArray).at(0) as FormGroup;
          period2Controls.patchValue(periodObj);
        }
        this.startTime = periodObj.endTime ? this.convertTo24HourFormat(periodObj.endTime) : null
      }
      this.periodForm.patchValue({
        startTime: this.startTime,
        endTime: null
      })
      this.closeModal.nativeElement.click()
    }
  }
  onSubmit() {
    console.log(this.shiftForm.value);
    console.log(this.classFormControl.value);
    this.loader.show()
    let classStr = '';
    const selectedToppings = this.classFormControl.value
    if (selectedToppings !== null && Array.isArray(selectedToppings)) {
      if (selectedToppings?.length > 0) {
        selectedToppings.forEach((element: any, index: number) => {
          const selectedObjects = this.filteredClassList.find((option: any) => option.class == element);

          if (selectedObjects) {
            classStr = selectedToppings.length - 1 == index ? (classStr + selectedObjects.classid) : index == 0 ? (selectedObjects.classid + ', ') : (classStr + selectedObjects.classid + ', ')
          }
        });
      }
    }
    if (this.shiftForm.value.startingDay) {
      this.dayValue = this.dayList.find((item: any) => item.weekDays == this.shiftForm.value.startingDay).dayID
      // if (this.dayValue) {
      //   this.dayValue = this.dayValue.split(' ')[1]
      // }
    }
    let shiftDetailArr: string[] = []
    if (this.shiftForm.value.shiftFormArr.length > 0) {
      this.shiftForm.value.shiftFormArr.forEach((element: any) => {
        let rowPeriod = ''
        let rowPeriodType = ''
        this.colvalues.forEach((data: any, index: number) => {
          let time = (element[data.col][0].startTime) + '-' + (element[data.col][0].endTime)
          let period;
          rowPeriod = this.colvalues.length - 1 == index ? (rowPeriod + '@' + time + '@') : index == 0 ? ('@' + time) : (rowPeriod + '@' + time)
          if (element[data.col][0].periodType == "Period") {
            period = 1
          } else {
            period = 0
          }
          rowPeriodType = this.colvalues.length - 1 == index ? (rowPeriodType + '@' + period + '@') : index == 0 ? ('#@' + period) : (rowPeriodType + '@' + period)
        });
        shiftDetailArr.push(rowPeriod + rowPeriodType)
      });
    }
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      clstid: this.shiftTimingId,
      sftid: this.shiftForm.value.shiftId,
      shiftName: this.shiftForm.value.shiftName,
      no_of_Days: (this.shiftForm.value.noOfdaysPerWeek).toString(),
      no_of_Periods: (this.shiftForm.value.noOfPeriodsPerDay).toString(),
      start_Day: this.dayValue ? (this.dayValue).toString() : (this.shiftForm.value.startingDay).toString(),
      start_Time: this.shiftForm.value.startTime,
      end_Time: this.shiftForm.value.endTime,
      shift_class: classStr,
      perioddetails: shiftDetailArr.length > 0 ? shiftDetailArr.join('ê') : '',
    }
    console.log(postData);
    console.log(classStr);

    this.service.postHttpService(postData, 'createShiftPreiod').subscribe((response: any) => {
      if (response.status) {
        this.getShiftList(this.shiftTimingId);
        this.loader.hide()
        Swal.fire({
          title: "Success",
          text: "Record saved successfully",
          icon: 'success',
          width: '350px',
          heightAuto: false
        }).then(() => {
          this.getShiftList(this.shiftTimingId);
        });
      } else {
        this.loader.hide()
        Swal.fire({
          title: "Error",
          text: response.statusMessage,
          icon: 'warning',
          width: '350px',
          heightAuto: false
        })
      }
    }, error => {
      this.loader.hide();
    });
  }
  onDayChange(data: any) {
    this.dayValue = ''
    if (data) {
      this.dayValue = this.dayList.find((item: any) => item.weekDays == data.value).dayName
      if (this.dayValue) {
        this.dayValue = this.dayValue.split(' ')[1]
      }
    }
  }
  validateTimes() {

    // const startTimeParts = this.shiftForm.value.startTime.split(':');
    // const endTimeParts = this.shiftForm.value.endTime.split(':');

    // const startHour = parseInt(startTimeParts[0], 10);
    // const startMinute = parseInt(startTimeParts[1], 10);

    // const endHour = parseInt(endTimeParts[0], 10);
    // const endMinute = parseInt(endTimeParts[1], 10);
    let date = new Date()
    const startTime = this.shiftForm.value.startTime;
    const endTime = this.shiftForm.value.endTime;
    // Compare the start and end times
    // if (endHour > startHour || (endHour === startHour && endMinute > startMinute)) {
    if (startTime && endTime && startTime >= endTime) {
      this.timeErr = true;
    } else {
      this.timeErr = false;
    }
  }
  onEditShift(id: String) {
    this.shiftForm.get('shiftId')?.setValue(id);
    this.classSelectedValues = []
    this.classFormControl = new FormControl([], Validators.required)
    this.getClassList()
    let postData = {
      shiftid: id,
      schoolcode: localStorage.getItem('schoolcode')
    }
    this.colvalues = []
    this.shiftFormArray.clear()
    this.service.getHttpServiceWithDynamicParams(postData, 'findShiftDetails').subscribe((response: any) => {
      if (response.status) {
        let day = this.dayList.filter((item: any) => {
          // let splitDay = item.dayName.split(' ')[1]
          let splitDay = item.dayID;
          if (splitDay == response.resultData[0].start_Day) {
            return item;
          }
        });
        if (response.resultData[0].classes) {
          this.classFormControl.setValue(response.resultData[0].classes.split(','));
        }

        this.shiftForm.patchValue({
          shiftId: response.resultData[0].sftid,
          shiftName: response.resultData[0].shift,
          class: response.resultData[0].classes,
          startTime: response.resultData[0].start_Time,
          endTime: response.resultData[0].end_Time,
          noOfdaysPerWeek: response.resultData[0].no_of_Days,
          noOfPeriodsPerDay: response.resultData[0].no_of_Periods,
          startingDay: day ? day[0].weekDays : '',
          saveType: 'edit'
        })
        this.isAddShiftShow = true

        if (response.resultData[0].sftprdtime) {
          let periodArr = response.resultData[0].sftprdtime.split('ê')
          let dayArr = (this.shiftForm.value.startingDay).split('@')
          for (let j = 0; j < this.shiftForm.value.noOfPeriodsPerDay; j++) {
            this.colvalues.push({ col: "period" + j })
          }
          for (let i = 0; i < periodArr.length; i++) {

            let obj: { [key: string]: any } = {};

            let objSplit = periodArr[i].split('#');
            let periodPlit = objSplit[0].split('@')
            const nonEmptyArray = periodPlit.filter((value: any) => value.trim() !== '');
            let periodTypeSplit = objSplit[1].split('@')
            const nonEmptyperiodArray = periodTypeSplit.filter((value: any) => value.trim() !== '');


            nonEmptyArray.forEach((item: any, i: number) => {
              let time = item.split('-')
              let type = 'Period'
              nonEmptyperiodArray.forEach((element: any, j: number) => {

                if (element == "0" && i == j) {
                  type = 'Break'
                }
              });
              obj['period' + [i]] = (this.fb.array([this.fb.group({ startTime: time[0], endTime: time[1], periodType: type })]));
            });

            const newFormGroup = this.fb.group({
              day: dayArr[i], ...obj
            });
            const formArray = this.shiftForm.get('shiftFormArr') as FormArray;
            formArray.push(newFormGroup);
          }
          console.log(this.shiftForm);

        }
      }
      return null
    })
  }
  onDeleteShift(id: string) {
    let postData = {
      shiftid: id,
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear'),
      CLSTID: this.shiftTimingId
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
        this.service.deleteHttpService(postData, 'deleteShiftDetails').subscribe((response) => {
          if (response.status) {
            Swal.fire({
              title: "Success",
              text: "Successfully deleted!",
              icon: 'success',
              width: '350px',
              heightAuto: false
            }).then(() => {
              this.getShiftList(this.shiftTimingId);
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
            this.getShiftList(this.shiftTimingId);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getShiftList(this.shiftTimingId);
      }
    });
  }
  convertTo24HourFormat(time12Hour: String) {
    const [time, ampm] = time12Hour.split(' ');

    // Split the hours and minutes
    const [hours, minutes] = time.split(':');

    // Convert hours to a number
    let hour = parseInt(hours, 10);

    // Check if hours and minutes are valid numbers
    if (isNaN(hour) || isNaN(parseInt(minutes, 10))) {
      return null; // Handle invalid input
    }

    // Adjust hours for 12-hour format
    if (ampm === 'PM' && hour !== 12) {
      hour += 12;
    } else if (ampm === 'AM' && hour === 12) {
      hour = 0;
    }

    // Convert back to string with leading zeros if necessary
    const hourString = hour.toString().padStart(2, '0');
    const minuteString = minutes.padStart(2, '0');

    // Reconstruct the time in 24-hour format
    const time24Hour = `${hourString}:${minuteString}`;

    return time24Hour;
  }

  convertToAmPmFormat(time24Hour: String) {
    const [time, ampm] = time24Hour.split(' ');
    // Split the time string into hours and minutes
    const [hours, minutes] = time.split(':');

    // Convert hours to a number
    const hour = parseInt(hours, 10);

    // Determine AM or PM and format the time
    let amPm;
    if (hour >= 12) {
      amPm = 'PM';
    } else {
      amPm = 'AM';
    }

    // Convert 24-hour format to 12-hour format
    const hour12 = hour % 12 || 12;

    // Create the AM/PM time string
    const timeAmPm = `${hour12}:${minutes} ${amPm}`;

    return timeAmPm;
  }
  onSelectChange(event: any) {
    const selectedValue = event.value;
    if (selectedValue.length > 0) {
      this.shiftForm.patchValue({
        class: selectedValue.join(', ')
      })
    } else {
      this.shiftForm.patchValue({
        class: null
      })
    }
    this.searchTextboxControl.patchValue('');
    this.searchValue = ''
  }
  onStartTimeChange(event: any) {
    let currentDate = new Date()
    let oldStartDate = new Date()
    let oldEndDate = new Date()
    this.timeErr = false
    if (event) {
      let currentTime = this.convertTo24HourFormat(event);
      if (currentTime) {
        let [shours, sminutes] = currentTime?.split(':').map(Number);
        currentDate.setHours(shours, sminutes, 0, 0);
      }
      this.shiftFormArray.value.forEach((element1: any, i: number) => {
        this.colvalues.forEach((element2: any, j: number) => {
          console.log(element1[element2.col]);

          let oldStartTime = this.convertTo24HourFormat(element1[element2.col][0].startTime);
          let oldEndTime = this.convertTo24HourFormat(element1[element2.col][0].endTime);
          if (element1[element2.col][0].startTime) {
            if (oldStartTime) {
              let [shours, sminutes] = oldStartTime?.split(':').map(Number);
              oldStartDate.setHours(shours, sminutes, 0, 0);
            }
            if (oldEndTime) {
              let [shours, sminutes] = oldEndTime?.split(':').map(Number);
              oldEndDate.setHours(shours, sminutes, 0, 0);
            }
            if (((currentDate.getTime() <= oldStartDate.getTime()) || (currentDate.getTime() < oldEndDate.getTime()) && this.periodForm.invalid)) {
              this.timeErr = true
              return
            } else {
              this.timeErr = false
            }
          }
        });
      });
    }
  }
  onEndDateChange() {
    let oldStartDate = new Date()
    let oldEndDate = new Date()
    let shiftTime = this.convertTo24HourFormat(this.shiftForm.value.endTime);
    let periodTime = this.convertTo24HourFormat(this.periodForm.value.endTime);
    if (shiftTime) {
      if (shiftTime) {
        let [shours, sminutes] = shiftTime?.split(':').map(Number);
        oldEndDate.setHours(shours, sminutes, 0, 0);
      }
      if (periodTime) {
        let [shours, sminutes] = periodTime?.split(':').map(Number);
        oldStartDate.setHours(shours, sminutes, 0, 0);
      }
      if ((oldEndDate.getTime() < oldStartDate.getTime())) {
        this.timeErr = true
        return
      } else {
        this.timeErr = false
      }
    }
  }

  multiSelectChange(e: any) {
    this.searchTextboxControl.patchValue('');
    this.searchValue = '';
    if (e == true) {
      this.searchTextBox.nativeElement.focus();
    }
  }
  setSelectedClassValues() {
    if (this.classFormControl.value && this.classFormControl.value.length > 0) {
      this.classFormControl.value.forEach((e: any) => {
        if (this.classSelectedValues.indexOf(e) == -1) {
          this.classSelectedValues.push(e);
        }
      });
    }
  }
}

function timeRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const startTime = control.get('startTime')?.value;
  const endTime = control.get('endTime')?.value;

  if (startTime && endTime) {
    let currentStart = new Date();
    let currentEnd = new Date();

    const [stime, sampm] = startTime.split(' ');
    const [etime, eampm] = endTime.split(' ');
    let [shours, sminutes] = stime.split(':').map(Number);
    let [ehours, eminutes] = etime.split(':').map(Number);
    if (sampm === 'PM' && shours !== 12) {
      shours += 12;
    } else if (sampm === 'AM' && shours === 12) {
      shours = 0;
    }
    if (eampm === 'PM' && ehours !== 12) {
      ehours += 12;
    } else if (eampm === 'AM' && ehours === 12) {
      ehours = 0;
    }
    if (!isNaN(shours) && !isNaN(sminutes)) {
      currentStart.setHours(shours, sminutes, 0, 0);
    }
    if (!isNaN(ehours) && !isNaN(eminutes)) {
      currentEnd.setHours(ehours, eminutes, 0, 0);
    }
    // currentStart.setHours(Number(stime.split()[0]), Number(stime.split()[1]), 0, 0 )
    // console.log(stime.split(':')[0]);
    // currentEnd.setHours(Number(etime.split()[0]), Number(etime.split()[1]), 0, 0 )

    // if (startTime && endTime && startTime >= endTime) {
    if (currentStart.getTime() >= currentEnd.getTime()) {
      return { invalidTimeRange: true };
    }
  }
  return null;

}

function timeRangeValidator2(control: AbstractControl): { [key: string]: boolean } | null {
  const startTime = control.get('startTime')?.value;
  const endTime = control.get('endTime')?.value;

  if (startTime && endTime) {
    let currentStart = new Date();
    let currentEnd = new Date();

    const [stime, sampm] = startTime.split(' ');
    const [etime, eampm] = endTime.split(' ');
    let [shours, sminutes] = stime.split(':').map(Number);
    let [ehours, eminutes] = etime.split(':').map(Number);
    if (sampm === 'PM' && shours !== 12) {
      shours += 12;
    } else if (sampm === 'AM' && shours === 12) {
      shours = 0;
    }
    if (eampm === 'PM' && ehours !== 12) {
      ehours += 12;
    } else if (eampm === 'AM' && ehours === 12) {
      ehours = 0;
    }
    if (!isNaN(shours) && !isNaN(sminutes)) {
      currentStart.setHours(shours, sminutes, 0, 0);
    }
    if (!isNaN(ehours) && !isNaN(eminutes)) {
      currentEnd.setHours(ehours, eminutes, 0, 0);
    }
    // currentStart.setHours(Number(stime.split()[0]), Number(stime.split()[1]), 0, 0 )
    // console.log(stime.split(':')[0]);
    // currentEnd.setHours(Number(etime.split()[0]), Number(etime.split()[1]), 0, 0 )

    // if (startTime && endTime && startTime >= endTime) {
    if (currentStart.getTime() >= currentEnd.getTime()) {
      return { invalidTimeRange: true };
    }
  }
  return null;

}

