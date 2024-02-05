import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-applicant-list',
  templateUrl: './add-applicant-list.component.html',
  styleUrls: ['./add-applicant-list.component.scss']
})
export class AddApplicantListComponent implements OnInit {
  selectedValue: string | undefined;
  constructor() { }

 

  ngOnInit(): void {
  }
  foods: Food[] = [
    { value: '1 A', viewValue: '1 A' },
    { value: '1 B', viewValue: '1 B' },
    { value: '2 A', viewValue: '2 A' },
    { value: '2 B', viewValue: '2 B' },
    { value: '3 A', viewValue: '3 A' },

  ];
}
interface Food {
  value: string;
  viewValue: string;
}

