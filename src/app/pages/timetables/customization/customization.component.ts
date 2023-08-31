import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss']
})
export class CustomizationComponent implements OnInit {

  selectedValue: string | undefined;
  selectedValuestudents: string | undefined
  
  input: any
  form: FormGroup | any;
  submitted!: boolean;
  constructor(private router: Router, public dialog: MatDialog) { }

 
  ngOnInit(): void {
  }
  foods: Food[] = [
    { value: '1', viewValue: 'Arial' },
    { value: '2', viewValue: 'Arial Black' },
    { value: '3	', viewValue: 'Arial Unicode MS' },
    { value: '4', viewValue: 'Bahnschrift	' },
    { value: '5	', viewValue: 'Bahnschrift Condensed' },
    { value: '6', viewValue: 'Bahnschrift Light' },
    { value: '7', viewValue: 'Bahnschrift Light Condensed' },
    { value: '8', viewValue: 'Bahnschrift Light SemiCondensed' },
    { value: '9', viewValue: 'Bahnschrift SemiBold' },
    { value: '10', viewValue: 'Bahnschrift SemiBold Condensed' },
    { value: '11', viewValue: 'Bahnschrift SemiBold SemiConden' },
    { value: '12', viewValue: 'Bahnschrift SemiCondensed' },
    { value: '13', viewValue: 'Bahnschrift SemiLight' },
    { value: '14', viewValue: 'Bahnschrift SemiLight Condensed' },

  ];
  students: students[] = [
    { value: '1', viewValue: 'Arial' },
    { value: '2', viewValue: 'Arial Black' },
    { value: '3	', viewValue: 'Arial Unicode MS' },
    { value: '4', viewValue: 'Bahnschrift	' },
    { value: '5	', viewValue: 'Bahnschrift Condensed' },
    { value: '6', viewValue: 'Bahnschrift Light' },
    { value: '7', viewValue: 'Bahnschrift Light Condensed' },
    { value: '8', viewValue: 'Bahnschrift Light SemiCondensed' },
    { value: '9', viewValue: 'Bahnschrift SemiBold' },
    { value: '10', viewValue: 'Bahnschrift SemiBold Condensed' },
    { value: '11', viewValue: 'Bahnschrift SemiBold SemiConden' },
    { value: '12', viewValue: 'Bahnschrift SemiCondensed' },
    { value: '13', viewValue: 'Bahnschrift SemiLight' },
    { value: '14', viewValue: 'Bahnschrift SemiLight Condensed' },

  ];

}

interface Food {
  value: string;
  viewValue: string;
}
interface students {
  value: string;
  viewValue: string;
}
