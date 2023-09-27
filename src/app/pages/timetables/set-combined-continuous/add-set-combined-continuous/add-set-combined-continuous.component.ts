import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { LoaderService } from 'src/app/pages/common/loading/loader.service';
import { CommonService } from 'src/app/pages/services/common.service';

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

  form!: FormGroup;
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
  constructor(private service: CommonService, private loader: LoaderService, private cdr: ChangeDetectorRef,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup();
    this.getShiftList();

  }
  formGroup() {
    this.form = this.fb.group({
      shift: [null, Validators.required],
      class: [null, Validators.required],
      subjectClass: [null, Validators.required]
    })
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
  getClassList() {
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      shiftid: this.form.value.shift
    }
    console.log(this.form.value);

    this.loader.show()
    this.service.getHttpServiceWithDynamicParams(postData, 'getCombinedClasstList').subscribe(response => {
      console.log('classtList', response);

      if (response.status) {
        this.loader.hide()
        this.classDropdownList = response.resultData
        this.cdr.detectChanges();
      } else {
        this.loader.hide();
      }
    }, error => {
      this.loader.hide();
    });
  }

  getClassSubjectList() {
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
    console.log(this.form.value);

    this.loader.show()
    this.service.getHttpServiceWithDynamicParams(postData, 'getCombinedClassStafList').subscribe(response => {
      console.log('getClassSubjectList', response);

      if (response.status) {
        this.loader.hide()
        this.classStaffDropdownList = response.resultData
        this.cdr.detectChanges();
      } else {
        this.loader.hide();
      }
    }, error => {
      this.loader.hide();
    });
  }

}
