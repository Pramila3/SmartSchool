import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-manual-adjustment',
  templateUrl: './manual-adjustment.component.html',
  styleUrls: ['./manual-adjustment.component.scss']
})
export class ManualAdjustmentComponent implements OnInit {

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  numbers = [1, 2, 3, 4, 5, 6, 7, 8];

  day1 = [{ name: 'monday', 'disabled': true , 'color': 'background-color:#4d4fc1d1; color: #fff;'},
  { name: 'Tamil', 'disabled': false },
  { name: 'English', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  { name: 'Maths', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  { name: 'Social', 'disabled': false },
  { name: 'Science', 'disabled': false },
  { name: 'Science', 'disabled': false }];

  day2 = [{ name: 'Tuesday', 'disabled': true , 'color': 'background-color:#4d4fc1d1; color: #fff;'},
  { name: 'Tamil', 'disabled': false },
  { name: 'English', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  { name: 'Maths', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  { name: 'Maths', 'disabled': false },
  { name: 'Social', 'disabled': false },
  { name: 'Science', 'disabled': false }];

  day3 = [{ name: 'Wednesday', 'disabled': true , 'color': 'background-color:#4d4fc1d1; color: #fff;'},
  { name: 'Tamil', 'disabled': false },
  { name: 'English', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  { name: 'Maths', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  { name: 'Social', 'disabled': false },
  { name: 'Social', 'disabled': false },
  { name: 'Science', 'disabled': false }];

  day4 = [{ name: 'Thursday', 'disabled': true , 'color': 'background-color:#4d4fc1d1; color: #fff;'},
  { name: 'Tamil', 'disabled': false },
  { name: 'English', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  { name: 'Maths', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4; color: #fff;' },
  { name: 'Social', 'disabled': false },
  { name: 'Social', 'disabled': false },
  { name: 'Science', 'disabled': false }];

  day5 = [{ name: 'Friday', 'disabled': true , 'color': 'background-color:#4d4fc1d1;color: #fff;'},
  { name: 'Tamil', 'disabled': false },
  { name: 'English', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4;color: #fff;' },
  { name: 'Maths', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4;color: #fff;' },
  { name: 'Social', 'disabled': false },

  { name: 'Social', 'disabled': false },
  { name: 'Science', 'disabled': false }];


  day6 = [{ name: 'Saturday', 'disabled': true , 'color': 'background-color:#4d4fc1d1; color: #fff;'},
  { name: 'Tamil', 'disabled': false },
  { name: 'English', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4;color: #fff; color: #fff;' },
  { name: 'Maths', 'disabled': false },
  { name: 'PT', 'disabled': true, 'color': 'background-color:#866fd8c4;color: #fff; color: #fff;' },
  { name: 'Social', 'disabled': false },
  { name: 'Social', 'disabled': false },
  { name: 'Science', 'disabled': false }];

  drop(event: CdkDragDrop<any[]>) {
    console.log(event.container.data, event.currentIndex, event.previousContainer.data, event.previousIndex);
    let currIndex = event.currentIndex != 9 ? event.currentIndex : 8;
    let preIndex = event.previousIndex != 9 ? event.previousIndex : 8;
    let temp = event.container.data[currIndex]

   if(![0,3,5].includes(currIndex)){
    if (event.previousContainer === event.container) {
      event.container.data.splice(currIndex, 1, event.container.data[preIndex]);
      event.container.data.splice(preIndex, 1, temp);

    } else {
      event.container.data.splice(currIndex, 1, event.previousContainer.data[preIndex]);
      event.previousContainer.data.splice(preIndex, 1, temp);
    }
   }
  }

}

