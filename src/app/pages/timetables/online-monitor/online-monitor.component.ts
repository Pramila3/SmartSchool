import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-online-monitor',
  templateUrl: './online-monitor.component.html',
  styleUrls: ['./online-monitor.component.scss']
})
export class OnlineMonitorComponent implements OnInit {
  @Input() item: string | undefined;
  selectedValue: string | undefined;
  selectedValuesetting: string | undefined

  input: any
  form: FormGroup | any;
  submitted!: boolean;
  constructor(private router: Router, public dialog: MatDialog) { }

  
  items = [
    {value: 'I can be dragged', disabled: false},
    {value: 'I cannot be dragged', disabled: true},
    {value: 'I can also be dragged', disabled: false},
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
  ngOnInit(): void {
  }
  foods: Food[] = [
    { value: 'Day1', viewValue: 'Day1' },
    { value: 'Day2', viewValue: 'Day2' },
    { value: 'Day3', viewValue: 'Day3' },
    { value: 'Day4', viewValue: 'Day4' },
    { value: 'Day5', viewValue: 'Day5' },
    { value: 'Day6', viewValue: 'Day6' },
    { value: 'Day7', viewValue: 'Day7' },
  ];


}

interface Food {
  value: string;
  viewValue: string;
}

