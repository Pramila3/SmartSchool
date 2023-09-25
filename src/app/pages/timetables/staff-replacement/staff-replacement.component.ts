import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-replacement',
  templateUrl: './staff-replacement.component.html',
  styleUrls: ['./staff-replacement.component.scss']
})
export class StaffReplacementComponent implements OnInit {

  selectedValue: string | undefined;
  selectedValuereplace: string | undefined
  
  input: any
  form: FormGroup | any;
  submitted!: boolean;
  constructor(private router: Router, public dialog: MatDialog) { }

 
  ngOnInit(): void {
  }
  Staff: Staff[] = [
    { value: '1', viewValue: 'ANTONY BENITOR J  (BSMS32)' },
    { value: '2', viewValue: 'ARUN  (BKMS0075)' },
    { value: '3', viewValue: 'AHASTHILINGAM PILLAI  (BKMS0107)' },
  
  ];

  Replace: Replace[] = [
    { value: '1', viewValue: 'ABDULHALIM  (BKMHSS136)' },
    { value: '2', viewValue: 'AHILA S (BKMHSS20)' },
    { value: '3', viewValue: 'AGNES SHYLINE NISHA I (BKS1714)' },
    { value: '4', viewValue: 'AJITHKUMAR K  (BKMS0020)' },
    { value: '5', viewValue: 'ANANDA DAS S B  (BSMS63)' },
    { value: '6', viewValue: 'ANANTH K (BKMS0009)' },
    { value: '7', viewValue: 'ANANTH S (BKMS0099)' },
  ];
}

interface Staff {
  value: string;
  viewValue: string;
}

interface Replace {
  value: string;
  viewValue: string;
}