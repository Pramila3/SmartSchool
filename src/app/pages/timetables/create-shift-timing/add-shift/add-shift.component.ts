import { Component, OnInit } from '@angular/core';
// import { TimepickerConfig } from 'ngx-material-timepicker';


@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss'],
  // providers: [
  //   TimepickerConfig // You might need to provide the TimepickerConfig in your component
  // ]
})
export class AddShiftComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

// export class TimeRangePickerComponent {
//   startTime: string;
//   endTime: string;
// }