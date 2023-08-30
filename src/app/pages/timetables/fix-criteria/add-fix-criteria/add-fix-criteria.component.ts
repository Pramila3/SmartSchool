import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-fix-criteria',
  templateUrl: './add-fix-criteria.component.html',
  styleUrls: ['./add-fix-criteria.component.scss']
})
export class AddFixCriteriaComponent implements OnInit {
  selectedValue1: string | undefined;
  selectedValue2: string | undefined;
  selectedValue3: string | undefined;

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