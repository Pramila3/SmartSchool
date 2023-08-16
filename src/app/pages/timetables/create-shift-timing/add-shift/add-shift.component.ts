
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  toppings = new FormControl([]);
  searchValue = '';
  toppingList = ['LKG', '1 A', '1 B', '2 A', '2 B'];

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
  }
  constructor(private service: CommonService) { }

  ngOnInit() {
    this.shiftTimingId = history.state.id
    this.timetableName = history.state.timetableName
    if (this.shiftTimingId) {
      this.getShiftList(this.shiftTimingId);
    }
    this.getClassList();
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
  getClassList(){
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
  addShift(){
    this.isAddShiftShow = true;
  }
}

