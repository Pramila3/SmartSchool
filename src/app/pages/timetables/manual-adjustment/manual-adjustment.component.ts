import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from "@angular/core";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
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

  @Output('cdkDropListDropped') dropped: EventEmitter<CdkDragDrop<any, any>> = new EventEmitter<CdkDragDrop<any, any>>();
  saveType: string = '';

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
    private cdr: ChangeDetectorRef, private renderer: Renderer2
  ) { }

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
          this.loader.hide();
          // console.log(
          //   "BindGridManualAdjustment----- classids",
          //   this.BindGridManualAdjustment,
          //   this.classids
          // );
          // this.BindGridManualAdjustment.forEach((element: any, i: number) => {

          //   element.table = this.transformResponseData(element)
          // })
        } else {
          this.loader.hide();

        }
      }, error => {
        this.loader.hide();
      });
    this.cdr.detectChanges();
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
      copiedcell: this.dragData.trim(),
      pastedcell: this.dropData.trim(),
      type: this.saveType
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
  droppedItems: any[] = [];
  onDrop(event: CdkDragDrop<any[]>, item: any) {

    if (event.previousContainer !== event.container) {
      // Handle the transfer logic if dropping into a different container
      event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex;
    }

    // Handle other drop logic as needed
    if (this.dragData && this.dropData) {
      this.SaveManualAdjustment();
    }
  }

  onDrop1(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      // Move item within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move item from source list to destination list
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    this.findClosestCell(event.dropPoint);

  }
  nonFixDragMoved(data: any) {
    console.log(data);
    if (data) {
      this.dragData = data.staffId + ',' + data.staff;
    }
  }

  findClosestCell(dropPoint: { x: number, y: number }): any {
    const tables = document.querySelectorAll('.table');
    let tableIndex;
    if (tables.length > 0) {
      tables.forEach((table, index) => {
        const rect = table.getBoundingClientRect();
        if (dropPoint.x >= rect.left && dropPoint.x <= rect.right && dropPoint.y >= rect.top && dropPoint.y <= rect.bottom) {
          tableIndex = index;
        }
      });

      if (tableIndex != undefined) {
        const table = document.getElementById('dragTable' + tableIndex);
        if (!table) {
          // Table element not found
          return { rowIndex: -1, colIndex: -1 };
        }

        const cells = table.getElementsByTagName('td');
        let minDistance = Infinity;
        let closestCell: HTMLElement | null = null;

        // Iterate over each cell to find the closest one to the drop point
        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          const cellRect = cell.getBoundingClientRect();

          // Calculate the distance between the cell center and the drop point
          const cellCenterX = cellRect.left + cellRect.width / 2;
          const cellCenterY = cellRect.top + cellRect.height / 2;
          const distance = Math.sqrt((dropPoint.x - cellCenterX) ** 2 + (dropPoint.y - cellCenterY) ** 2);

          if (distance < minDistance) {
            minDistance = distance;
            closestCell = cell;
          }
        }

        // Find the row and column index of the closest cell
        if (closestCell) {
          const parentRow = closestCell.parentElement;
          if (parentRow) {
            const parentElement = closestCell.parentElement;
            if (parentElement && parentElement.children) {
              // const table2: HTMLTableElement | null = document.querySelector('.table');
              const table2: HTMLTableElement | null = tables[tableIndex] as HTMLTableElement;
              const rowIndex = Array.from(parentRow.parentElement!.children).indexOf(parentRow);
              const colIndex = Array.from(parentElement.children).indexOf(closestCell);
              const rowData = table2?.rows[rowIndex + 1];
              const cellData = rowData?.cells[colIndex].textContent;
              console.log(rowIndex, colIndex, cellData);
              if (rowIndex && colIndex && cellData) {
                let staff = rowData?.cells[colIndex].innerHTML.match(/<span[^>]*>(.*?)<\/span>/)
                console.log(staff);

                if (staff) {
                  this.dropData = staff[1]
                  this.saveType = "nonfixed"
                  this.SaveManualAdjustment()
                }
              }
              // return true;
            }
          }
        }

        // No cells found
        return { rowIndex: 0, colIndex: 0 };
      }
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
        if (!isNaN(+(this.dropData))) {
          let data = item.class_id + ',' + rowIndex + ',' + (this.dropData).trim()
          this.dropData = data
          this.saveType = "empty"
        } else {
          this.dragData = this.dragData.trim() + ",undefined"
          this.saveType = "dragable"
        }
      }
      console.log("Index" + rowIndex, colIndex);

      console.log("Drag" + this.dragData);
      console.log("Drop" + this.dropData);
    }
  }


  transformResponseData(item: any) {
    const timetableData = item.timetableData.split(/#/).filter(Boolean);
    const table: any = [];
    for (let i = 0; i < timetableData.length; i++) {
      let arr: string[] = []

      const dayParts = timetableData[i].split('@');
      dayParts.forEach((element: any) => {
        arr.push(element)
      });
      table.push(arr)
      // }
    }
    timetableData.forEach((data: any, index: number) => {

    });

    return table;
  }

  onDrop3(event: CdkDragDrop<string[]>, rowIndex: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}

