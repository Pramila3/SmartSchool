
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss'],

})
export class AddShiftComponent implements OnInit {
  toppings = new FormControl([]);
  searchValue = '';
  toppingList = ['LKG', '1 A', '1 B', '2 A', '2 B' ];

  get filteredToppingList() {
    const lowerCaseSearch = this.searchValue.toLowerCase();
    return this.toppingList.filter(topping => topping.toLowerCase().includes(lowerCaseSearch));
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
  constructor() { }

  ngOnInit() {

  }
}

