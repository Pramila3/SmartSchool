import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/pages/common/loading/loader.service';
import { CommonService } from 'src/app/pages/services/common.service';
import Swal from 'sweetalert2';

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
  data: any[] = []; // Array to store API data
  headers: string[] = []; // Array to store table headers

  searchValue = '';
  searchValue1 = '';
  searchValue2 = '';

  Days: any[] = []
  classid = '';
  subjectid = '';
  staffid = '';
  no_of_Periods = 0;
  selectedAction: string = 'R'; // Default radio button selected
  cellClick = 0;
  fixCriteriaId!: any;
  type!: any;
  constructor(private service: CommonService, private router: Router, private cdr: ChangeDetectorRef,
    private fb: FormBuilder, private loader: LoaderService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getClassList()
    this.formGroup()
    this.fixCriteriaId = history.state.id;
    console.log(this.fixCriteriaId);
    this.type = history.state.type;
    if (this.fixCriteriaId) {
      this.findFixCriteria()

    }
  }
  formGroup() {
    this.form = this.fb.group({
      id: [null],
      classes: [null, Validators.required],
      subjectList: [null, Validators.required],
      staffs: [null, Validators.required],
      Reserve: [null, Validators.required],

    })
  }
  findFixCriteria() {
    this.classid = history.state.classId;
    this.subjectid = history.state.subjectId;
    this.staffid = history.state.staffId;
    if (this.classid) {
      this.getSubjectList(this.classid)
    }
    if (this.subjectid) {
      this.getStaffListdata(this.subjectid)
    }
    if(this.staffid){
      this.getBindTableData(this.staffid);
    }
    setTimeout(() => {
    this.form.patchValue({
      id: this.fixCriteriaId,
      classes: this.classid,
      subjectList: this.subjectid,
      staffs: this.staffid,
      Reserve: this.type == "Avoided" ? 'X' : 'R',
    })
  }, 500);
 
  console.log(this.type);
  
    console.log(this.form);
  }
  getClassList() {
    this.loader.show()
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear')

    }
    this.service.getHttpServiceWithDynamicParams(postData, 'getclassList').subscribe((response: any) => {
      console.log('classlist bind data', response);

      if (response.status) {
        this.classList = response.resultData
        console.log('classlistres', response.resultData);
        this.loader.hide()
      } else {

      }
    })
  }

  applyClassFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchValue = inputValue;
    console.log("ClassFilter", inputValue);
  }
  applySubjectFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchValue1 = inputValue;
    console.log("SubjectFilter ", inputValue);
  }
  applyStaffFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchValue2 = inputValue;
    console.log("StaffFilter", inputValue);
  }

  get filteredClassList() {
    const lowerCaseSearch = this.searchValue.toLowerCase();
    return this.classList.filter((element: any) => element.class.toLowerCase().includes(lowerCaseSearch));
  }
  get filteredSubjectList() {
    const lowerCaseSearch = this.searchValue1?.toLowerCase();
    return this.subjectList.filter((element: any) => element?.subjectcode?.toLowerCase().includes(lowerCaseSearch));
  }
  get filteredStaffList() {
    const lowerCaseSearch = this.searchValue2?.toLowerCase();
    return this.staffList.filter((element: any) => element?.staff?.toLowerCase().includes(lowerCaseSearch));
  }
  getSubjectList(classid: any) {
    this.classid = classid
    console.log('classid', classid);

    this.loader.show()
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear'),
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

  getStaffListdata(subjectid: any) {
    console.log('subjectid', subjectid);

    this.loader.show()
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear'),
      classid: this.classid,
      subjectid: subjectid
    }
    this.subjectid = subjectid

    this.service.getHttpServiceWithDynamicParams(postData, 'getStaffList').subscribe((response: any) => {
      console.log('stafflistresdata', response);

      if (response.status) {
        this.staffList = response.resultData
        console.log('stafflistres', response.resultData);
        // this.getBindTableData

        this.loader.hide()

      }
    })
  }

  getBindTableData(staffid: any) {
    console.log('staffid', staffid);
    this.loader.show()
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      academicyear: localStorage.getItem('academicYear'),
      classid: this.classid,
      subjectid: this.subjectid,
      staffid: staffid
    }
    this.staffid = staffid

    this.service.getHttpServiceWithDynamicParams(postData, 'getBindPeriodsData').subscribe((response: any) => {
      console.log('table bind data', response);

      if (response.status) {
        this.data = response.resultData;
        this.headers = Object.keys(this.data[0]);
        this.no_of_Periods = Number(this.data[0]['no_of_Periods']);
        this.data.forEach((data) => {
          data['perioddetails'] = data['perioddetails'].split('#')
          data['perioddetails'].forEach((period: string, index: number) => {
            data['perioddetails'][index] = period.split('@')
            data['perioddetails'][index].splice(0, 1)
            this.Days.push(period.split('@')[0])
          })
        })
        this.loader.hide();


      } else {
        this.loader.hide();
      }

    })
  };

  manageClick = (rowIndex: number, colIndex: number) => {
    if (this.selectedAction === 'X' || this.selectedAction === 'R') {
      this.data[0].perioddetails[rowIndex][colIndex] = this.selectedAction;
    } else if (this.data[0].perioddetails[rowIndex][colIndex] === 'R' || this.data[0].perioddetails[rowIndex][colIndex] === 'X') {
      // Toggle between 'R' and 'X' if one of them is already present
      this.data[0].perioddetails[rowIndex][colIndex] = this.data[0].perioddetails[rowIndex][colIndex] === 'R' ? 'X' : 'R';
    } else {
      // Cell is empty, set it to the selected action
      this.data[0].perioddetails[rowIndex][colIndex] = this.selectedAction;
    }
  }

  onCellDoubleClick(rowIndex: number, colIndex: number) {
    let selectedValue = this.data[0].perioddetails[rowIndex][colIndex];
    console.log(selectedValue, this.cellClick, this.selectedAction);

    if (this.data[0].maxAllotPeriods > 0 && this.data[0].maxAllotPeriods > this.cellClick && selectedValue == '0') {
      this.cellClick += 1;
      this.manageClick(rowIndex, colIndex)
    } else if (['X', 'R'].includes(selectedValue)) {
      this.manageClick(rowIndex, colIndex)
    } else {
      // maxAllotPeriods is not greater than 0, restrict interaction
      // You can add code here to show a message or handle the restriction as needed
      alert(' Maximum ' + this.data[0].maxAllotPeriods + ' period(s) can be reserved');
    }

    if (this.selectedAction == selectedValue) {
      this.data[0].perioddetails[rowIndex][colIndex] = '0';
      this.cellClick -= 1;
    }
  }


  SavePeriods() {
    // console.log('staffid', staffid);d
    this.loader.show();
    // Assuming this is your grid data structure
    const gridData = this.data[0].perioddetails;

    // Initialize variables to store the formatted string
    let rsvdayperiod = '';
    let avdayperiod = '';
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
            rsvdayperiod += `@${colIndex + 1}`;
          }
        }
        //for avoid
        if (cellValue === 'X') {
          // Add "ê" to separate rows or "@" to separate columns if needed
          if (end2) {
            if (avdayperiod != '')
              avdayperiod += 'ê';
            end2 = false;
          }
          // Append the period information in the format 'row@col' to the string
          if (avdayperiod == '' || avdayperiod.endsWith('ê')) {
            avdayperiod += `${rowIndex + 1}@${colIndex + 1}`;
          } else {
            avdayperiod += `@${colIndex + 1}`;
          }

        }
      }
    }

    if (rsvdayperiod !== '' && !rsvdayperiod.endsWith('ê')) rsvdayperiod += 'ê';
    if (avdayperiod !== '' && !avdayperiod.endsWith('ê')) avdayperiod += 'ê';
    console.log(rsvdayperiod, avdayperiod);

    // Now 'rsvdayperiod' contains the formatted string

    [0, 1].forEach((type) => {

      if ((type == 0 && rsvdayperiod !== '') || (type == 1 && avdayperiod !== '')) {
        let postData = {
          rsvid: this.form.value.id,
          schoolcode: localStorage.getItem('schoolcode'),
          rsvclassid: this.classid,
          rsvsubid: this.subjectid,
          rsvstaffid: this.staffid,
          rsvtype: type.toString(),
          rsvdayperiod: type ? avdayperiod : rsvdayperiod,
          rsvsftid: this.data[0].sftid
        }

        this.service.postHttpService(postData, 'ReservedPeriodsData').subscribe((response: any) => {
          if(response){
            Swal.fire({
              title: "Success",
              text: "Record saved successfully",
              icon: 'success',
              width: '350px',
              heightAuto: false
            }).then(() => {
            });
  
          } else {
            Swal.fire({
              title: "Error",
              text: response.statusMessage,
              icon: 'warning',
              width: '350px',
              heightAuto: false
            });
          }
          console.log('SaveReservedPeriods', response);
          this.loader.hide();
        })
      }
    })
  }


  // cellClick(i: number, j: number) {
  //   console.log("clicked", this.data[0].perioddetails[i][j] == '0');

  //   let postData = {
  //     schoolcode: localStorage.getItem('schoolcode'),
  //     academicyear: localStorage.getItem('academicYear'),
  //     classid: this.classid,
  //     subjectid: this.subjectid,
  //     staffid: this.staffid
  //   }
  //   this.service.postHttpService(postData, 'ReservedPeriodsData').subscribe((response: any) => {
  //     console.log('ReservedPeriodsData', response);
  //   })
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