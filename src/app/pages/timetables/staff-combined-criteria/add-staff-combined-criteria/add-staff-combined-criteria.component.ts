import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/pages/common/loading/loader.service';
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
  data: any[] = []; // Array to store API data
  headers: string[] = []; // Array to store table header
  Days: any[] = []
  no_of_Periods = 0;
  cellClick = 0;
  selectedAction: string = 'R'; // Default radio button selected


  selectedValue1: string | undefined;

  selectedValue2: string | undefined;

  form!: FormGroup | any;
  searchValue: string = '';
  searchValue1: string = '';
  searchValue2: string = '';
  isShowWarningMsg!: boolean;

  constructor(private service: CommonService, private fb: FormBuilder, private cdr: ChangeDetectorRef, private loader: LoaderService) { }

  ngOnInit(): void {
    this.getClassList();
    this.formGroup();
  }
  formGroup() {
    this.form = this.fb.group({
      class: [null, Validators.required],
      subject: [null, Validators.required],
      staff: [null, Validators.required],
      staffIds: [null]
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
    this.loader.show()
    this.subjectList = []
    this.stafftList = []
    this.data = []
    this.isShowWarningMsg = false;
    this.form.patchValue({
      staff: null,
      staffIds: null,
      subject: null
    })
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear'),
      classid: this.form.value.class

    }
    this.service.getHttpServiceWithDynamicParams(postData, 'getDefineSubjectDropDown').subscribe(response => {
      if (response.status) {
        this.subjectList = response.resultData
        this.loader.hide()
      } else {
        this.loader.hide()
      }
    })
  }
  getClassList() {
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear'),
    }
    this.loader.show()
    this.service.getHttpServiceWithDynamicParams(postData, 'getDefineClassDropDown').subscribe(response => {
      if (response.status) {
        this.classesList = response.resultData
        this.loader.hide()
      } else {
        this.loader.hide()
      }
    })
  }
  getStaffList() {
    this.loader.show()
    this.stafftList = []
    this.data = []
    this.isShowWarningMsg = false;
    this.form.patchValue({
      staff: null,
      staffIds: null
    })
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear'),
      classid: this.form.value.class,
      subjectid: this.form.value.subject
    }
    this.service.getHttpServiceWithDynamicParams(postData, 'getDefineStaffDropDown').subscribe(response => {
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
            } else {
              check.disabled = false
            }
            // this.form.get('staff').setValue(arr);
            console.log(this.form);
          });
          this.form.patchValue({
            staff: arr,
            staffIds: splitValue
          })
          this.cdr.detectChanges()
          this.getBindPeriodsList()
          this.loader.hide()
        } else {
          this.isShowWarningMsg = true;
          this.loader.hide()
        }
      }
    })
  }
  getBindPeriodsList() {
    this.loader.show()
    if (this.form.value.staff) {
      const arr = this.form.value.staff.map((element: any) => this.stafftList.find((data: any) => data.staff === element)?.staffNo).filter(Boolean);
      this.form.get('staffIds').setValue(arr)
    }
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear'),
      classids: this.form.value.class,
      subjectid: this.form.value.subject,
      staffid: this.form.value.staffIds ? this.form.value.staffIds.join(',') : ''
    }
    console.log(postData);
    this.service.getHttpServiceWithDynamicParams(postData, 'bindDefinedPeriods').subscribe((response: any) => {
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
            console.log(period.split('@'));
            // if (this.data[0].maxAllotPeriods == "0") {
            period.split('@').forEach(element => {
              if (element == 'R') {
                this.data[0].maxAllotPeriods = +(this.data[0].maxAllotPeriods) + 1;
                this.cellClick += 1;
              }
            });
            // }
            console.log(this.data[0].maxAllotPeriods);
            console.log(this.cellClick);

          })
        })

        this.loader.hide();


      } else {
        this.loader.hide();
      }
    })
  }
  onCellDoubleClick(rowIndex: number, colIndex: number) {
    console.log(this.data[0].maxAllotPeriods, this.cellClick);

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
}
