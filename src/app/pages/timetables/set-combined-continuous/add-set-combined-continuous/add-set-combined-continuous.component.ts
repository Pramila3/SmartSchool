import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
export class AddSetCombinedContinuousComponent implements OnInit {

  selectedValue1: string | undefined;
  shiftList: any = [];
  searchValue: string = '';
  searchValue1: string = '';
  searchValue2: string = '';

  form!: FormGroup | any;;
  classList: any;

  toppings = new FormControl('');
  toppingList: string[] = ['JKG A - TT - AGNES SHYLINE NISHA I (BKS1714)', 'JKG A - READ - ABDULHALIM (BKMHSS136)  ', 'JKG A - TT - AGNES SHYLINE NISHA I (BKS1714)'];

  classlist = new FormControl([]);
  classesList: string[] = ['JKG A  ', 'JKG B',];

  searchTextboxControl = new FormControl();
  selectedValues: any;
  classDropdownList: any = [];
  filteredOptions!: Observable<any[]>;
  classStaffDropdownList: any = [];
  tabledata: any;

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

  constructor(private service: CommonService, private loader: LoaderService, private cdr: ChangeDetectorRef,
    private fb: FormBuilder, private router: Router,) { }

  ngOnInit(): void {
    this.formGroup();
    this.getShiftList();
    this.combineid = history.state.id
    if (this.combineid) {
      this.form.get('id').setValue(this.combineid)
    }
    this.findropdownlist()
  }
  formGroup() {
    this.form = this.fb.group({
      id: [null],
      shift: [null, Validators.required],
      class: [null, Validators.required],
      subjectClass: [null, Validators.required]
    })
  }
   findropdownlist() {
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      cmdid: this.combineid
    }
    this.loader.show()
    this.service.getHttpServiceWithDynamicParams(postData, 'findDropdownList').subscribe(async response => {
      console.log('findDropdownList', response);
      this.form.get('shift').setValue(response?.resultData[0].shiftid);

      await this.getClassList();
      let className:any=[];
      response?.resultData[0].classid?.split(',').map((classid:any) =>{ 
        className.push(this.classDropdownList.filter((list:any) => list.classid == classid)[0].class)
      });
      this.form.get('class').setValue(className);

      await this.getClassSubjectList();
      let staffSub:any=[];
      response?.resultData[0].staffid?.split(',').map((staffid:any) =>{ 
        staffSub.push(this.classStaffDropdownList.filter((list:any) => list.staffid == staffid)[0].staff)
      });
      this.form.get('subjectClass').setValue(staffSub);

      this.getBindPeriodtable();

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
      console.log('shiftList', response);

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
    console.log("called");
  }
  applyClassStaffSubjectFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchValue2 = inputValue;
    console.log("called", inputValue);
  }
  applyClassFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchValue1 = inputValue;
    console.log("called", inputValue);
  }
  get filteredShiftList() {
    const lowerCaseSearch = this.searchValue.toLowerCase();
    return this.shiftList.filter((element: any) => element.shift.toLowerCase().includes(lowerCaseSearch));
  }
  get ClassStaffSubject() {
    const lowerCaseSearch = this.searchValue2.toLowerCase();
    return this.classStaffDropdownList.filter((element: any) => element?.staff?.toLowerCase().includes(lowerCaseSearch));
  }
  get ClassList() {
    const lowerCaseSearch = this.searchValue1.toLowerCase();
    return this.classDropdownList.filter((element: any) => element.class?.toLowerCase().includes(lowerCaseSearch));
  }
  async getClassList() {
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      shiftid: this.form.value.shift
    }
    console.log(this.form.value);

    this.loader.show()
     try{
      let response:any =await this.service.getHttpServiceWithDynamicParams(postData, 'getCombinedClasstList').toPromise();
     //.subscribe(response => {
      console.log('classtList', response);
      this.loader.hide();

      if (response.status) {
        this.loader.hide()
        this.classDropdownList = response.resultData
        this.cdr.detectChanges();
      } else {
        this.loader.hide();
      }
     }catch{
      this.loader.hide();
     }
  }

  async getClassSubjectList() {
    console.log(this.form.value);
    let classIdArr: any[] = []
    if (this.form.value.class) {
      this.form.value.class.forEach((element: any) => {
        let checkValue = this.classDropdownList.find((data: any) => data.class == element)
        checkValue
        if (checkValue) {
          classIdArr.push(checkValue.classid)
        }
      });
    }

    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      classid: classIdArr.length > 0 ? classIdArr.join(', ') : '',
      academicyear: localStorage.getItem('academicYear')
    }
    console.log(this.form.value,postData);

    this.loader.show();
    try{
      let response:any=await this.service.getHttpServiceWithDynamicParams(postData, 'getCombinedClassStafList').toPromise();//.subscribe(response => {
        console.log('getClassSubjectList', response);
  
        if (response.status) {
          this.loader.hide()
          this.classStaffDropdownList = response.resultData
          this.cdr.detectChanges();
        } else {
          this.loader.hide();
        }
    }catch{
      this.loader.hide();
    }
    
  }
  getBindPeriodtable() {
    console.log(this.form.value);
    let classIdArr: any[] = []
    if (this.form.value.class) {
      this.form.value.class.forEach((element: any) => {
        let checkValue = this.classDropdownList.find((data: any) => data.class == element)
        checkValue
        if (checkValue) {
          classIdArr.push(checkValue.classid)
        }
      });
    }

    let subjectIdArr: any[] = []
    if (this.form.value.subjectClass) {
      this.form.value.subjectClass.forEach((element: any) => {
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


    this.loader.show()
    this.service.getHttpServiceWithDynamicParams(postData, 'getBindperiodtable').subscribe(response => {
      console.log('getBindperiodtable', response);

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
    }, error => {
      this.loader.hide();
    });
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

  SaveCombineddates() {

    let classIdArr: any[] = []
    if (this.form.value.class) {
      this.form.value.class.forEach((element: any) => {
        let checkValue = this.classDropdownList.find((data: any) => data.class == element)
        checkValue
        if (checkValue) {
          classIdArr.push(checkValue.classid)
        }
      });
    }

    let subjectIdArr: any[] = []
    if (this.form.value.subjectClass) {
      this.form.value.subjectClass.forEach((element: any) => {
        let checkValue = this.classStaffDropdownList.find((data: any) => data.staff == element)
        if (checkValue) {
          subjectIdArr.push(checkValue.staffid)
        }
      });
    }
    console.log('subjectIdArr', subjectIdArr);

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

    console.log(rsvdayperiod);

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
      console.log('SaveCombinedClass', response);

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
