import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, forkJoin, map, startWith } from 'rxjs';
import { LoaderService } from 'src/app/pages/common/loading/loader.service';
import { CommonService } from 'src/app/pages/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-set-combined-continuous',
  templateUrl: './add-set-combined-continuous.component.html',
  styleUrls: ['./add-set-combined-continuous.component.scss']
})
export class AddSetCombinedContinuousComponent implements OnInit, AfterViewInit {

  selectedValue1: string | undefined;
  shiftList: any = [];
  searchValue: string = '';
  searchValue1: string = '';
  searchValue2: string = '';

  form!: FormGroup | any;
  submitted!: boolean;
  classList: any;

  toppings = new FormControl('');
  toppingList: string[] = ['JKG A - TT - AGNES SHYLINE NISHA I (BKS1714)', 'JKG A - READ - ABDULHALIM (BKMHSS136)  ', 'JKG A - TT - AGNES SHYLINE NISHA I (BKS1714)'];

  classlist = new FormControl([]);
  classesList: string[] = ['JKG A  ', 'JKG B',];

  selectedValues: any;
  classDropdownList: any = [];
  filteredOptions!: Observable<any[]>;
  classStaffDropdownList: any = [];
  tabledata: any;
  staffSelectedValues: any = [];

  data: any[] = []; // Array to store API data
  headers: string[] = []; // Array to store table header
  Days: any[] = []
  classid = '';
  subjectid = '';
  staffid = '';
  no_of_Periods = 0;
  selectedAction: string = 'R'; // Default radio button selected
  cellClick = 0;
  combineid: any
  staffFormControl = new FormControl([], Validators.required);
  classFormControl = new FormControl([], Validators.required);
  searchTextboxControl = new FormControl();
  clasSearchTextboxControl = new FormControl();


  @ViewChild('search') searchTextBox!: ElementRef;
  classSelectedValues: any = [];

  constructor(private service: CommonService, private loader: LoaderService, private cdr: ChangeDetectorRef,
    private fb: FormBuilder, private router: Router,) { }
  ngAfterViewInit(): void {
    console.log(this.searchTextBox.nativeElement);
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.formGroup();
    this.getShiftList();
    this.combineid = history.state.id
    if (this.combineid) {
      this.form.get('id').setValue(this.combineid)
      this.findropdownlist()
    }
  }
  formGroup() {
    this.form = this.fb.group({
      id: [null],
      shift: [null, Validators.required],
      class: [null],
      subjectClass: [null]
    })
  }
  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
  findropdownlist() {
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      cmdid: this.combineid
    }
    this.loader.show()
    this.service.getHttpServiceWithDynamicParams(postData, 'findDropdownList').subscribe(async response => {
      this.form.get('shift').setValue(response.resultData ? (response?.resultData[0]?.shiftid) : null);

      await this.getClassList();
      let className: any = [];
      response?.resultData[0].classid?.split(',').map((classid: any) => {
        className.push(this.classDropdownList.filter((list: any) => list.classid == classid)[0]?.class)
      });
      this.form.get('class').setValue(className);
      this.classFormControl.patchValue(className);
      await this.getClassSubjectList();

      let staffSub: any = [];

      response?.resultData[0].staffid?.split(',').map((staffid: any) => {
        staffSub.push(this.classStaffDropdownList.filter((list: any) => list.staffid == staffid)[0]?.staff)
      });

      this.form.get('subjectClass').setValue(staffSub);
      this.staffFormControl.patchValue(staffSub)
      this.getBindPeriodtable(null);

    }, error => {
      this.loader.hide();
    });
  }
  getShiftList() {
    let postData = {
      schoolcode: localStorage.getItem('schoolcode')
    }
    this.loader.show()
    this.service.getHttpServiceWithDynamicParams(postData, 'getCombinedShiftList').subscribe(response => {

      if (response.status) {
        this.loader.hide()
        this.shiftList = response.resultData
        this.cdr.detectChanges();
      } else {
        this.loader.hide();
      }
    }, error => {
      this.loader.hide();
    });
  }
  applyShiftFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchValue = inputValue;
  }
  applyClassStaffSubjectFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchValue2 = inputValue;
  }
  applyClassFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchValue1 = inputValue;
  }
  get filteredShiftList() {
    const lowerCaseSearch = this.searchValue.toLowerCase();
    return this.shiftList.filter((element: any) => element.shift.toLowerCase().includes(lowerCaseSearch));
  }
  get ClassStaffSubject() {
    const lowerCaseSearch = this.searchValue2.toLowerCase();
    this.setSelectedValues();
    this.staffFormControl.patchValue(this.staffSelectedValues);
    return this.classStaffDropdownList.filter((element: any) => element?.staff?.toLowerCase().includes(lowerCaseSearch));
  }
  get ClassList() {
    const lowerCaseSearch = this.searchValue1.toLowerCase();
    this.setSelectedClassValues();
    
    this.classFormControl.patchValue(this.classSelectedValues);
    return this.classDropdownList.filter((element: any) => element.class?.toLowerCase().includes(lowerCaseSearch));
  }
  async getClassList() {
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      shiftid: this.form.value.shift
    }

    this.loader.show()
    try {
      let response: any = await this.service.getHttpServiceWithDynamicParams(postData, 'getCombinedClasstList').toPromise();
      //.subscribe(response => {
      this.loader.hide();

      if (response.status) {
        this.loader.hide()
        this.classDropdownList = response.resultData
        this.cdr.detectChanges();
      } else {
        this.loader.hide();
      }
    } catch {
      this.loader.hide();
    }
  }

  async getClassSubjectList() {
    let classIdArr: any[] = []
    this.classStaffDropdownList = []
    this.staffSelectedValues = []
    this.staffFormControl = new FormControl([], Validators.required)
    // this.classFormControl = new FormControl([], Validators.required)
    this.data = []
    console.log(this.classFormControl.value);
    
    if (this.classFormControl.value) {
      this.classFormControl.value.forEach((element: any) => {
        let checkValue = this.classDropdownList.find((data: any) => data.class == element)
        checkValue
        if (checkValue) {
          classIdArr.push(checkValue.classid)
        }
      });
    }
    this.searchTextboxControl.patchValue('');
    this.searchValue1 = '';
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      classid: classIdArr.length > 0 ? classIdArr.join(', ') : '',
      academicyear: localStorage.getItem('academicYear')
    }

    this.loader.show();
    try {
      let response: any = await this.service.getHttpServiceWithDynamicParams(postData, 'getCombinedClassStafList').toPromise();//.subscribe(response => {

      if (response.status) {
        this.loader.hide()
        this.classStaffDropdownList = response.resultData
        if (this.form.valid) {
          this.getBindPeriodtable(null)
        }
        this.cdr.detectChanges();
      } else {
        this.loader.hide();
      }
    } catch {
      this.loader.hide();
    }

  }
  getBindPeriodtable(event: any) {
    console.log(this.staffSelectedValues);
    console.log(this.staffFormControl);

    this.setSelectedValues()
    let classIdArr: any[] = []
    if (this.classFormControl.value) {
      this.classFormControl.value.forEach((element: any) => {
        let checkValue = this.classDropdownList.find((data: any) => data.class == element)
        checkValue
        if (checkValue) {
          classIdArr.push(checkValue.classid)
        }
      });
    }
    this.searchTextboxControl.patchValue('');
    this.searchValue2 = ''
    let subjectIdArr: any[] = []
    // if (this.form.value.subjectClass) {
    //   this.form.value.subjectClass.forEach((element: any) => {
    //     let checkValue = this.classStaffDropdownList.find((data: any) => data.staff == element)
    //     checkValue
    //     if (checkValue) {
    //       subjectIdArr.push(checkValue.staffid)
    //     }
    //   });
    // }


    if (this.staffFormControl.value) {
      this.staffSelectedValues.forEach((element: any) => {
        let checkValue = this.classStaffDropdownList.find((data: any) => data.staff == element)
        checkValue
        if (checkValue) {
          subjectIdArr.push(checkValue.staffid)
        }
      });
    }

    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear'),
      shiftid: this.form.value.shift,
      staffid: subjectIdArr.length > 0 ? subjectIdArr.join(',') : '',
      classids: classIdArr.length > 0 ? classIdArr.join(',') : '',

    }
    // console.log('subjectIdArr', subjectIdArr);


    if (this.form.valid && this.staffFormControl.valid && this.classFormControl.valid) {
      this.loader.show()
      this.service.getHttpServiceWithDynamicParams(postData, 'getBindperiodtable').subscribe(response => {

        if (response.status) {
          this.data = response.resultData;
          this.headers = Object.keys(this.data[0]);
          this.no_of_Periods = Number(this.data[0]['no_of_Periods']);
          // this.data[0].maxAllotPeriods = this.data[0].maxAllotPeriods == '0' ? 0 : this.data[0].maxAllotPeriods
          // this.data[0].maxAllotPeriods = 0
          this.data.forEach((data) => {
            data['perioddetails'] = data['perioddetails'].split('#')
            data['perioddetails'].forEach((period: string, index: number) => {
              data['perioddetails'][index] = period.split('@')
              data['perioddetails'][index].splice(0, 1)
              this.Days.push(period.split('@')[0])
              // console.log(period.split('@'));
              // if (this.data[0].maxAllotPeriods == "0") {
              period.split('@').forEach(element => {
                if (element == 'R') {
                  this.data[0].maxAllotPeriods = +(this.data[0].maxAllotPeriods) + 1;
                  this.cellClick += 1;
                }
              });
              // }

            })
          })

          this.loader.hide();


        } else {
          this.loader.hide();
        }
      }, error => {
        this.loader.hide();
      });
    }
  }

  onCellDoubleClick(rowIndex: number, colIndex: number) {

    let selectedValue = this.data[0].perioddetails[rowIndex][colIndex];
    if (this.selectedAction === 'R') {
      if (selectedValue === '0' && this.data[0].maxAllotPeriods > 0 && this.data[0].maxAllotPeriods > this.cellClick) {
        this.data[0].perioddetails[rowIndex][colIndex] = 'R';
        this.cellClick += 1;
      } else if (selectedValue === 'R') {
        this.data[0].perioddetails[rowIndex][colIndex] = '0';
        this.cellClick -= 1;
      } else if (this.data[0].maxAllotPeriods <= this.cellClick) {
        alert('Maximum ' + this.data[0].maxAllotPeriods + ' period(s) can be reserved');
      }
    }

  }

  SaveCombineddates() {

    let classIdArr: any[] = []
    if (this.classFormControl.value) {
      this.classFormControl.value.forEach((element: any) => {
        let checkValue = this.classDropdownList.find((data: any) => data.class == element)
        checkValue
        if (checkValue) {
          classIdArr.push(checkValue.classid)
        }
      });
    }

    let subjectIdArr: any[] = []
    // if (this.form.value.subjectClass) {
    //   this.form.value.subjectClass.forEach((element: any) => {
    //     let checkValue = this.classStaffDropdownList.find((data: any) => data.staff == element)
    //     if (checkValue) {
    //       subjectIdArr.push(checkValue.staffid)
    //     }
    //   });
    // }
    if (this.staffFormControl.value) {
      this.staffFormControl.value.forEach((element: any) => {
        let checkValue = this.classStaffDropdownList.find((data: any) => data.staff == element)
        if (checkValue) {
          subjectIdArr.push(checkValue.staffid)
        }
      });
    }
    this.submitted = true;
    if (this.form.valid) {
      this.loader.show();
      // Assuming this is your grid data structure
      const gridData = this.data[0].perioddetails;

      // Initialize variables to store the formatted string
      let rsvdayperiod = '';

      let end1 = false;
      let end2 = false;
      // Iterate through the grid data
      for (let rowIndex = 0; rowIndex < gridData.length; rowIndex++) {
        for (let colIndex = 0; colIndex < gridData[rowIndex].length; colIndex++) {
          const cellValue = gridData[rowIndex][colIndex];

          if (!end1)
            end1 = colIndex == gridData[rowIndex].length - 1;
          if (!end2)
            end2 = colIndex == gridData[rowIndex].length - 1;

          //combine reserve
          if (cellValue === 'R') {
            // Add "ê" to separate rows or "@" to separate columns if needed
            if (end1) {
              if (rsvdayperiod != '')
                rsvdayperiod += 'ê';
              end1 = false;
            }
            // Append the period information in the format 'row@col' to the string
            if (rsvdayperiod == '' || rsvdayperiod.endsWith('ê')) {
              rsvdayperiod += `${rowIndex + 1}@${colIndex + 1}`;
            } else {
              // rsvdayperiod += `ê${colIndex + 1}`;
              rsvdayperiod += 'ê' + `${rowIndex + 1}@${colIndex + 1}`;

            }
          }

        }
      }

      if (rsvdayperiod !== '' && !rsvdayperiod.endsWith('ê')) rsvdayperiod += 'ê';

      // Now 'rsvdayperiod' contains the formatted string


      let postData = {
        cmbid: this.form.value.id,
        schoolcode: localStorage.getItem('schoolcode'),
        academicyear: localStorage.getItem('academicYear'),
        cmbclassids: classIdArr.length > 0 ? classIdArr.join(',') : '',
        cmbsubids: subjectIdArr.length > 0 ? subjectIdArr.map((data) => { let tmp = data?.split('@'); return tmp[tmp.length - 1] }).join(',') : '',
        cmbstaffids: subjectIdArr.length > 0 ? subjectIdArr.join(',') : '',
        cmbdayperiod: rsvdayperiod,
        cmbshiftid: this.form.value.shift,
      }
      this.service.postHttpService(postData, 'SaveCombinedClass').subscribe(response => {

        // if (response.status) {
        //   this.router.navigate(['/SetCombinedContinuous'])
        // }
        if (response.status) {
          Swal.fire({
            title: "Success",
            text: "Record saved successfully",
            icon: 'success',
            width: '350px',
            heightAuto: false,
          }).then(() => {
            this.router.navigate(['/timetable/SetCombinedContinuous'])
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
        this.loader.hide();
      })
    }
  }
  multiSelectChange(e: any) {
    // Set search textbox value as empty while opening selectbox 
    this.searchTextboxControl.patchValue('');
    this.searchValue2 = '';
    // Focus to search textbox while clicking on selectbox
    if (e == true) {
      this.searchTextBox.nativeElement.focus();
    }
  }
  classMultiSelectChange(e: any) {
    // Set search textbox value as empty while opening selectbox 
    this.clasSearchTextboxControl.patchValue('');
    this.searchValue2 = '';
    // Focus to search textbox while clicking on selectbox
    if (e == true) {
      this.searchTextBox.nativeElement.focus();
    }
  }

  setSelectedValues() {
    if (this.staffFormControl.value && this.staffFormControl.value.length > 0) {
      this.staffFormControl.value.forEach((e: any) => {
        if (this.staffSelectedValues.indexOf(e) == -1) {
          this.staffSelectedValues.push(e);
        }
      });
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

  selectionChange(event: any) {
    if (event.isUserInput && event.source.selected == false) {
      let index = this.staffSelectedValues.indexOf(event.source.value);
      this.staffSelectedValues.splice(index, 1)
      console.log(this.staffSelectedValues.length);

      if (this.staffSelectedValues.length == 0) {
        this.data = []
      }
    }
  }

  classSelectionChange(event: any) {
    if (event.isUserInput && event.source.selected == false) {
      let index = this.classSelectedValues.indexOf(event.source.value);
      this.classSelectedValues.splice(index, 1)
      console.log(this.classSelectedValues.length);

      if (this.classSelectedValues.length == 0) {
        this.data = []
      }
    }
  }
}
