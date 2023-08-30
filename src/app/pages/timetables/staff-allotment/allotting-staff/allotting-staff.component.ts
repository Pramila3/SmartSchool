import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allotting-staff',
  templateUrl: './allotting-staff.component.html',
  styleUrls: ['./allotting-staff.component.scss']
})
export class AllottingStaffComponent implements OnInit {

  selectedValue: string | undefined;
  selectedValuesetting: string | undefined
  input: any

  submitted!: boolean;
  constructor( private router: Router , public dialog: MatDialog) { }


  ngOnInit(): void {
  }

 

  openDialog() {
    this.dialog.open(NewSingleStaffallotmentmodal);
  }

}


@Component({
  selector: 'New-Single-Staff-allotment-modal',
  templateUrl: './New-Single-Staff-allotment-modal.html',
  styleUrls: ['./allotting-staff.component.scss']
  // standalone: true,
  // imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule, ],
  
})
export class NewSingleStaffallotmentmodal {

  selectedValue: string | undefined;
  input: any
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  foods: Food[] = [
    { value: '1 A', viewValue: '1 A' },
    { value: '1 B', viewValue: '1 B' },
    { value: '2 A', viewValue: '2 A' },
    { value: '2 B', viewValue: '2 B' },


  ];
 
}

interface Food {
  value: string;
  viewValue: string;
}
