import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../services/common.service';
import { FormBuilder } from '@angular/forms';
import { LoaderService } from '../../common/loading/loader.service';


@Component({
  selector: 'app-manual-adjustment',
  templateUrl: './manual-adjustment.component.html',
  styleUrls: ['./manual-adjustment.component.scss']
})
export class ManualAdjustmentComponent implements OnInit {
  BindNonFixPeriodsList: any;
  BindGridManualAdjustment: any;
  NoOfDays: any;
  NoOfPeriods: any;

  yourDataArray: string[][] = [];
  SaveManualkey: any;
  dragData: string = "";
  dropData: string = "";
  ngOnInit(): void {
    this.getNonFixPeriodsList();
    this.getManualAdjustmentPeriodsList();
  }
  constructor(private router: Router, public dialog: MatDialog, private service: CommonService, private fb: FormBuilder, private loader: LoaderService) { }
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
  getNonFixPeriodsList() {
    this.loader.show()
    let postData = {
      schoolcode: localStorage.getItem('schoolcode')
    }

    this.service.getHttpServiceWithDynamicParams(postData, 'BindNonFixedSubjects').subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          // this.BindList = response.resultData
          // console.log('BindList' , this.BindList);

          this.BindNonFixPeriodsList = response.resultData?.map((staff: { staff: any; }) => {
            return staff.staff;
          })
          console.log('BindNonFixPeriodsList-----', this.BindNonFixPeriodsList);

          // ?.map((staff: { staff: any; }) => {
          //   return staff.staff;
          // })
          this.loader.hide()
        }
      },

    );
  }
  getManualAdjustmentPeriodsList() {
    this.loader.show()
    let postData = {
      schoolcode: localStorage.getItem('schoolcode')
    }

    this.service.getHttpServiceWithDynamicParams(postData, 'BindGridManualAdjustment').subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.BindGridManualAdjustment = response.resultData
          console.log('BindGridManualAdjustment-----', this.BindGridManualAdjustment);
          this.loader.hide()
        }
      },

    );
  }

  SaveManualAdjustment() {
    this.loader.show()
    let postData = {
      schoolcode: localStorage.getItem('schoolcode'),
      copiedcell: this.dragData.trim(),
      pastedcell: this.dropData.trim(),
    }
    this.service.getHttpServiceWithDynamicParams(postData, 'SaveManualAdjustmentPeriods').subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.getManualAdjustmentPeriodsList()
          this.loader.hide()
        }
      },

    );
  }

  generateArray(n: number): any[] {
    return Array(n).fill(0);
  }

  getSubject(timetableData: string, rowIndex: number, colIndex: number): string {
    const dayData = timetableData.split("#")[rowIndex] ? timetableData.split("#")[rowIndex].split("@") : [];


    return (colIndex < dayData.length && (dayData[colIndex] != '' && dayData[colIndex] != '0')) ? dayData[colIndex] : dayData[colIndex] == '0' ? '' : 'Break';
  }



  shouldDisableDrag(rowIndex: number, colIndex: number, colValue: any): boolean {
    return (colIndex == 0 || colValue == 'Break') ? true : false; // Dragging is enabled by default
  }

  onDrop(event: CdkDragDrop<any[]>, item: any) {
    console.log(event);

    if (event.previousContainer !== event.container) {
      // Handle the transfer logic if dropping into a different container
      console.log();
      (
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    moveItemInArray(item, event.previousIndex, event.currentIndex);
    // Handle other drop logic as needed
    if(this.dragData && this.dropData){
      this.SaveManualAdjustment()
    }
  }

  numbers = [1, 2, 3, 4, 5, 6, 7, 8];


  day2 = [{ name: 'Tuesday', 'disabled': true, 'color': 'background-color:#4d4fc1d1; color: #fff;' },
  { name: 'Tamil', 'disabled': false },
  { name: 'English', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  { name: 'Maths', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  { name: 'Maths', 'disabled': false },
  { name: 'Social', 'disabled': false },
  { name: 'Science', 'disabled': false }];

  day3 = [{ name: 'Wednesday', 'disabled': true, 'color': 'background-color:#4d4fc1d1; color: #fff;' },
  { name: 'Tamil', 'disabled': false },
  { name: 'English', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  { name: 'Maths', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  { name: 'Social', 'disabled': false },
  { name: 'Social', 'disabled': false },
  { name: 'Science', 'disabled': false }];

  day4 = [{ name: 'Thursday', 'disabled': true, 'color': 'background-color:#4d4fc1d1; color: #fff;' },
  { name: 'Tamil', 'disabled': false },
  { name: 'English', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  { name: 'Maths', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  { name: 'Social', 'disabled': false },
  { name: 'Social', 'disabled': false },
  { name: 'Science', 'disabled': false }];

  day5 = [{ name: 'Friday', 'disabled': true, 'color': 'background-color:#4d4fc1d1;color: #fff;' },
  { name: 'Tamil', 'disabled': false },
  { name: 'English', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4;color: #fff;' },
  { name: 'Maths', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4;color: #fff;' },
  { name: 'Social', 'disabled': false },

  { name: 'Social', 'disabled': false },
  { name: 'Science', 'disabled': false }];


  day6 = [{ name: 'Saturday', 'disabled': true, 'color': 'background-color:#4d4fc1d1; color: #fff;' },
  { name: 'Tamil', 'disabled': false },
  { name: 'English', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4;color: #fff; color: #fff;' },
  { name: 'Maths', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4;color: #fff; color: #fff;' },
  { name: 'Social', 'disabled': false },
  { name: 'Social', 'disabled': false },
  { name: 'Science', 'disabled': false }];

  onDrop1(event: CdkDragDrop<any[]>) {
    console.log(event.container.data, event.currentIndex, event.previousContainer.data, event.previousIndex);
    let currIndex = event.currentIndex != 9 ? event.currentIndex : 8;
    let preIndex = event.previousIndex != 9 ? event.previousIndex : 8;
    let temp = event.container.data[currIndex]
    if (![0, 3, 5].includes(currIndex)) {
      if (event.previousContainer === event.container) {
        event.container.data.splice(currIndex, 1, event.container.data[preIndex]);
        event.container.data.splice(preIndex, 1, temp);

      } else {
        event.container.data.splice(currIndex, 1, event.previousContainer.data[preIndex]);
        event.previousContainer.data.splice(preIndex, 1, temp);
      }
    }
  }

  
  dragMoved(rowIndex: any, dragData: any,event: any){
  
    let dragDataSplit = dragData ? dragData.split('^') : ''
    if(dragData){
      this.dropData = ''
      this.dropData = ''
      this.dragData = dragDataSplit[1];
      const match = event.event.target.innerHTML ? event.event.target.innerHTML.match(/<span[^>]*>(.*?)<\/span>/): '';
      console.log(match[1]);
      if (match ) {
        this.dropData = match[1]
      }
      console.log("Drag" + this.dragData);
      console.log("Drop" + this.dropData);
    }
  }
}

