import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-set-combined-continuous',
  templateUrl: './add-set-combined-continuous.component.html',
  styleUrls: ['./add-set-combined-continuous.component.scss']
})
export class AddSetCombinedContinuousComponent implements OnInit {

  toppings = new FormControl('');
  toppingList: string[] = ['JKG A - TT - AGNES SHYLINE NISHA I (BKS1714)', 'JKG A - READ - ABDULHALIM (BKMHSS136)  ', 'JKG A - TT - AGNES SHYLINE NISHA I (BKS1714)'];

  classlist = new FormControl('');
  classesList: string[] = ['JKG A  ', 'JKG B', ];

  selectedValue1: string | undefined;


  constructor() { }

  ngOnInit(): void {
  }
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