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

  form!: FormGroup;
  classList: any;

  toppings = new FormControl('');
  toppingList: string[] = ['JKG A - TT - AGNES SHYLINE NISHA I (BKS1714)', 'JKG A - READ - ABDULHALIM (BKMHSS136)  ', 'JKG A - TT - AGNES SHYLINE NISHA I (BKS1714)'];

  classlist = new FormControl([]);
  classesList: string[] = ['JKG A  ', 'JKG B', ];

  searchTextboxControl = new FormControl();
  selectedValues: any;
  classDropdownList: any;
  filteredOptions!: Observable<any[]>;
  constructor(private service: CommonService, private loader: LoaderService, private cdr: ChangeDetectorRef,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup();
    this.getShiftList();
    
  }
  formGroup(){
    this.form = this.fb.group({
      shift: [null, Validators.required],
      class: [null, Validators.required],
      subjectClass: [null, Validators.required]
    })
  }
  getShiftList(){
    let postData ={
      schoolcode: localStorage.getItem('schoolcode')
    }
    this.loader.show()
    this.service.getHttpServiceWithDynamicParams(postData, 'getCombinedShiftList').subscribe(response =>{
      if(response.status){
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

  get filteredShiftList() {
    const lowerCaseSearch = this.searchValue.toLowerCase();
    return this.shiftList.filter((element: any) => element.shift.toLowerCase().includes(lowerCaseSearch));
  }

  getClassList(){
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      shiftid: this.form.value.shift
    }
    console.log(this.form.value);
    
    this.loader.show()
    this.service.getHttpServiceWithDynamicParams(postData, 'getCombinedClasstList').subscribe(response =>{
      if(response.status){
        this.loader.hide()
        this.classDropdownList = response.resultData
        this.classlist.valueChanges.subscribe((selectedItems) => {

        })
        this.cdr.detectChanges();
      } else {
        this.loader.hide();
      }
    }, error => {
      this.loader.hide();
    });
  }
  private _filter(name: string): String[] {
    const filterValue = name.toLowerCase();
    // Set selected values to retain the selected checkbox state 
    this.setSelectedValues();
    this.classlist.patchValue(this.selectedValues);
    let filteredList = this.classDropdownList.filter((option: any) => option.class.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }

  setSelectedValues() {
    console.log('selectFormControl', this.classlist.value);
    if (this.classlist.value && this.classlist.value.length > 0) {
      this.classlist.value.forEach((e) => {
        if (this.selectedValues.indexOf(e) == -1) {
          this.selectedValues.push(e);
        }
      });
    }
  }
  selectionChange(event: any) {
    // if (event.isUserInput && event.source.selected == false) {
    //   let index = this.selectedValues.indexOf(event.source.value);
    //   this.selectedValues.splice(index, 1)
    // }
  }
  clearSearch(event: any) {
    event.stopPropagation();
    this.searchTextboxControl.patchValue('');
  }

  filterOptions(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.filteredOptions = this.classDropdownList.filter((option: any) =>
      option.class.toLowerCase().includes(inputElement.value.toLowerCase())
    );
  }
}
