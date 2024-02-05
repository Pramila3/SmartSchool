import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conduct-interview',
  templateUrl: './conduct-interview.component.html',
  styleUrls: ['./conduct-interview.component.scss']
})
export class ConductInterviewComponent implements OnInit {
  selectedValue: string | undefined;
  selectedValue2: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }
  foods: Food[] = [
    { value: '1', viewValue: 'General' },
    { value: '2', viewValue: 'About School' },
    { value: '3', viewValue: 'Specialist' },

  ];
  keys: keys[] = [
    { value: '1', viewValue: 'Very Good' },
    { value: '2', viewValue: 'Good' },
    { value: '3', viewValue: 'Modorate' },
  ];
}
interface Food {
  value: string;
  viewValue: string;
}

interface keys {
  value: string;
  viewValue: string;
}
