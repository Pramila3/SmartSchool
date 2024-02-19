import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { CommonService } from "../../services/common.service";
import { FormBuilder } from "@angular/forms";
import { LoaderService } from "../../common/loading/loader.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manual-adjustment",
  templateUrl: "./manual-adjustment.component.html",
  styleUrls: ["./manual-adjustment.component.scss"],
})
export class ManualAdjustmentComponent implements OnInit {
  BindNonFixPeriodsList: any = [];
  BindGridManualAdjustment: any;
  NoOfDays: any;
  NoOfPeriods: any;

  yourDataArray: string[][] = [];
  SaveManualkey: any;
  dragData: string = "";
  dropData: string = "";
  classids: any;
  ngOnInit(): void {
    this.loader.show();
    this.getNonFixPeriodsList();
    this.getManualAdjustmentPeriodsList();
  }
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: CommonService,
    private fb: FormBuilder,
    private loader: LoaderService,
    private cdr: ChangeDetectorRef
  ) {}

  getNonFixPeriodsList() {
    this.loader.show();
    let postData = {
      schoolcode: localStorage.getItem("schoolcode"),
    };

    this.service
      .getHttpServiceWithDynamicParams(postData, "BindNonFixedSubjects")
      .subscribe((response: any) => {
        if (response.statusCode == 200) {
          // this.BindList = response.resultData
          // console.log('BindList' , this.BindList);

          this.BindNonFixPeriodsList = response.resultData?.filter(
            (staff: any) => {
              return +staff?.remaining > 0 ? staff.staff : null;
            }
          );
          // console.log("BindNonFixPeriodsList-----", this.BindNonFixPeriodsList);

          // ?.map((staff: { staff: any; }) => {
          //   return staff.staff;
          // })
          // this.loader.hide()
        }
      });
  }
  getManualAdjustmentPeriodsList() {
    this.loader.show();
    let postData = {
      schoolcode: localStorage.getItem("schoolcode"),
    };

    this.service
      .getHttpServiceWithDynamicParams(postData, "BindGridManualAdjustment")
      .subscribe((response: any) => {
        if (response.statusCode == 200) {
          this.BindGridManualAdjustment = response.resultData;
          this.classids = this.BindGridManualAdjustment.map(
            (item: { class_id: any }) => item.class_id
          );
          // console.log(
          //   "BindGridManualAdjustment----- classids",
          //   this.BindGridManualAdjustment,
          //   this.classids
          // );
          this.loader.hide();
        }
        this.cdr.detectChanges();
      });
  }

  // SaveManualAdjustment() {
  //   // Assuming this.dragData.trim() + ",undefined" is your string
  //   var draggedString = this.dropData;

  //   // Split the string by comma
  //   var valuesArray = draggedString.split(",");

  //   // Extract the values you need
  //   var extractedValues = [this.classids.item, valuesArray[3], valuesArray[4]];

  //   // If you need these values concatenated into a single string separated by commas
  //   var resultString = extractedValues.join(",");

  //   console.log("resultString", resultString); // Output: "3015, 2, 1"

  //   this.loader.show();
  //   let postData = {
  //     schoolcode: localStorage.getItem("schoolcode"),
  //     copiedcell: this.dragData.trim() + ",undefined",
  //     copiedcell : resultString,
  //     pastedcell: this.dropData.trim(),
  //     // pastedcell:resultString,
  //   };
  //   console.log(" this.dragData", this.dragData);

  //   this.service
  //     .postHttpService(postData, "SaveManualAdjustmentPeriods")
  //     .subscribe((response: any) => {
  //       if (response.statusCode == 200) {
  //         this.getManualAdjustmentPeriodsList();
  //         this.loader.hide();
  //       }
  //       Swal.fire({
  //         title: "API Result Data",
  //         text: JSON.stringify(response.resultData, null, 2),
  //         icon: "info",
  //         confirmButtonText: "OK",
  //       });
  //       this.cdr.detectChanges();
  //     });
  // }
  SaveManualAdjustment() {
    this.loader.show();
    let postData = {
      schoolcode: localStorage.getItem("schoolcode"),
      // copiedcell: dropValueIsZero
      //   ? resultString
      //   : this.dragData.trim() + ",undefined",
      copiedcell: this.dragData.trim() + ",undefined",
      pastedcell: this.dropData.trim(),
    };
    console.log("this.dragData", this.dragData);

    this.service
      .postHttpService(postData, "SaveManualAdjustmentPeriods")
      .subscribe((response: any) => {
        if (response.statusCode == 200) {
          this.getManualAdjustmentPeriodsList();
          this.loader.hide();
        }
        Swal.fire({
          title: "API Result Data",
          text: JSON.stringify(response.resultData, null, 2),
          icon: "info",
          confirmButtonText: "OK",
        });
        this.cdr.detectChanges();
      });
  }

  generateArray(n: number): any[] {
    return Array(n).fill(0);
  }

  getSubject(
    timetableData: string,
    rowIndex: number,
    colIndex: number
  ): string {
    const dayData = timetableData.split("#")[rowIndex]
      ? timetableData.split("#")[rowIndex].split("@")
      : [];

    return colIndex < dayData.length &&
      dayData[colIndex] != "" &&
      dayData[colIndex] != "0"
      ? dayData[colIndex]
      : dayData[colIndex] == "0"
      ? ""
      : "Break";
  }

  shouldDisableDrag(
    rowIndex: number,
    colIndex: number,
    colValue: any
  ): boolean {
    // console.log(colValue);
    let checkdoubleValue = colValue ? colValue.split("^") : null;
    let colDisable = checkdoubleValue;
    if (checkdoubleValue) {
      colDisable = checkdoubleValue[1];
    }
    // console.log('colValue', colValue);

    return colIndex == 0 ||
      colValue == "Break" ||
      colDisable == "NULL" ||
      colValue == ""
      ? true
      : false; // Dragging is enabled by default
  }

  onDrop(event: CdkDragDrop<any[]>, item: any) {
    console.log("event" + event.container);

    if (event.previousContainer !== event.container) {
      // Handle the transfer logic if dropping into a different container
      event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex;
    }
    moveItemInArray(item, event.previousIndex, event.currentIndex);

    console.log(
      "moveItemInArray " ,
      event.previousIndex,
      event.currentIndex
    );

    // Handle other drop logic as needed
    if (this.dragData && this.dropData) {
      this.SaveManualAdjustment();
    }
  }

  dragMoved(rowIndex: any, dragData: any, event: any, colIndex: any, item: any) {
    console.log(item);
    
    let dragDataSplit = dragData ? dragData.split("^") : "";
    if (dragData) {
      this.dropData = "";
      this.dropData = "";
      this.dragData = dragDataSplit[1];
      const match = event.event.target.innerHTML
        ? event.event.target.innerHTML.match(/<span[^>]*>(.*?)<\/span>/)
        : "";
      // console.log(match[1]);
      if (match) {
        this.dropData = match[1];
        if(!isNaN(+(this.dropData))){
          let data = item.class_id + ',' + rowIndex + ',' + (this.dropData).trim()
          this.dropData  = data
        }
      }
      console.log("Index" + rowIndex , colIndex);

      console.log("Drag" + this.dragData);
      console.log("Drop" + this.dropData);
    }
  }
}
