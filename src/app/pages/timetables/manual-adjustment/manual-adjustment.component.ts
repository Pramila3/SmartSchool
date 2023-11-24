import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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

  ngOnInit(): void {
    this.getNonFixPeriodsList();
    this.getManualAdjustmentPeriodsList();
  }
  constructor(private router: Router, public dialog: MatDialog, private service: CommonService, private fb: FormBuilder, private loader: LoaderService) { }

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
  generateArray(length: number): any[] {
    return Array(length).fill(0);
  }

  getSubject(timetableData: string, rowIndex: number, colIndex: number): string {
    const dayData = timetableData.split("#")[rowIndex] ? timetableData.split("#")[rowIndex].split("@") : [];
    return colIndex < dayData.length ? dayData[colIndex] : '';
  }

  // numbers = [1, 2, 3, 4, 5, 6, 7, 8];

  // day1 = [{ name: 'monday', 'disabled': true, 'color': 'background-color:#4d4fc1d1; color: #fff;' },
  // { name: 'Tamil', 'disabled': false },
  // { name: 'English', 'disabled': false },
  // { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  // { name: 'Maths', 'disabled': false },
  // { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  // { name: 'Social', 'disabled': false },
  // { name: 'Science', 'disabled': false },
  // { name: 'Science', 'disabled': false }];

  // day2 = [{ name: 'Tuesday', 'disabled': true, 'color': 'background-color:#4d4fc1d1; color: #fff;' },
  // { name: 'Tamil', 'disabled': false },
  // { name: 'English', 'disabled': false },
  // { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  // { name: 'Maths', 'disabled': false },
  // { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  // { name: 'Maths', 'disabled': false },
  // { name: 'Social', 'disabled': false },
  // { name: 'Science', 'disabled': false }];

  // day3 = [{ name: 'Wednesday', 'disabled': true, 'color': 'background-color:#4d4fc1d1; color: #fff;' },
  // { name: 'Tamil', 'disabled': false },
  // { name: 'English', 'disabled': false },
  // { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  // { name: 'Maths', 'disabled': false },
  // { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  // { name: 'Social', 'disabled': false },
  // { name: 'Social', 'disabled': false },
  // { name: 'Science', 'disabled': false }];

  // day4 = [{ name: 'Thursday', 'disabled': true, 'color': 'background-color:#4d4fc1d1; color: #fff;' },
  // { name: 'Tamil', 'disabled': false },
  // { name: 'English', 'disabled': false },
  // { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  // { name: 'Maths', 'disabled': false },
  // { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  // { name: 'Social', 'disabled': false },
  // { name: 'Social', 'disabled': false },
  // { name: 'Science', 'disabled': false }];

  // day5 = [{ name: 'Friday', 'disabled': true, 'color': 'background-color:#4d4fc1d1;color: #fff;' },
  // { name: 'Tamil', 'disabled': false },
  // { name: 'English', 'disabled': false },
  // { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4;color: #fff;' },
  // { name: 'Maths', 'disabled': false },
  // { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4;color: #fff;' },
  // { name: 'Social', 'disabled': false },

  // { name: 'Social', 'disabled': false },
  // { name: 'Science', 'disabled': false }];


  // day6 = [{ name: 'Saturday', 'disabled': true, 'color': 'background-color:#4d4fc1d1; color: #fff;' },
  // { name: 'Tamil', 'disabled': false },
  // { name: 'English', 'disabled': false },
  // { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4;color: #fff; color: #fff;' },
  // { name: 'Maths', 'disabled': false },
  // { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4;color: #fff; color: #fff;' },
  // { name: 'Social', 'disabled': false },
  // { name: 'Social', 'disabled': false },
  // { name: 'Science', 'disabled': false }];

  // drop(event: CdkDragDrop<any[]>) {
  //   console.log(event.container.data, event.currentIndex, event.previousContainer.data, event.previousIndex);
  //   let currIndex = event.currentIndex != 9 ? event.currentIndex : 8;
  //   let preIndex = event.previousIndex != 9 ? event.previousIndex : 8;
  //   let temp = event.container.data[currIndex]

  //   if (![0, 3, 5].includes(currIndex)) {
  //     if (event.previousContainer === event.container) {
  //       event.container.data.splice(currIndex, 1, event.container.data[preIndex]);
  //       event.container.data.splice(preIndex, 1, temp);

  //     } else {
  //       event.container.data.splice(currIndex, 1, event.previousContainer.data[preIndex]);
  //       event.previousContainer.data.splice(preIndex, 1, temp);
  //     }
  //   } 
  // }

}

