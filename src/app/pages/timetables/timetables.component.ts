import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonService } from "../services/common.service";
import { FormBuilder } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { LoaderService } from "../common/loading/loader.service";
import Swal from "sweetalert2";
declare var $: any; // Declare jQuery globally (not recommended, but works for demonstration)
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import * as ExcelJS from "exceljs";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-timetables",
  templateUrl: "./timetables.component.html",
  styleUrls: ["./timetables.component.scss"],
})
export class TimetablesComponent implements OnInit {
  timetableList: any;
  timetableName: any;
  ttlPercentage: any;

  shiftId: any;
  shiftList: any = [];
  pageList: any = [];
  pageId: any = [];
  selectedOption: string = ""; // or any appropriate type
  previousShiftId: string = ""; // Initialize previous shift ID
  timetableview: string = "General";
  checkedOption: string = "General"; // Set the initially checked option

  constructor(
    private service: CommonService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private loader: LoaderService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loader.show();
    this.authLogin();
    // this.getShiftList();
  }

  getProcessTimetableList() {
    this.timetableview = "General";
    this.loader.show();
    let postData = {
      schoolcode: localStorage.getItem("schoolcode"),
      sftid: this.shiftId,
    };

    this.service
      .getHttpServiceWithDynamicParams(postData, "ProcessTimetableList")
      .subscribe(
        (response: any) => {
          if (response.status) {
            this.timetableList = this.sanitizer.bypassSecurityTrustHtml(
              response.resultData
            );
            this.timetableName = response.timetableName;
            this.ttlPercentage = response.ttlPercentage;
            this.loader.hide();
          } else {
            // Handle the case where no data is found
            this.timetableList = ""; // Set timetableList to null or an empty array, whichever you prefer
            this.timetableName = ""; // Clear the timetableName
            this.ttlPercentage = ""; // Clear the ttlPercentage
            this.loader.hide();
          }
        },
        (error) => {
          // Handle API error here and show an alert
          console.error("API Error:", error);
          this.loader.hide();

          // Show an alert using a library like Swal (SweetAlert2) or your preferred alert mechanism
          Swal.fire({
            title: "API Error",
            text: "An error occurred while fetching data from the API.",
            icon: "error",
            // timer: 3000 // Adjust the timer as needed
          });
        }
      );
  }

  authLogin() {
    this.route.queryParams.subscribe(async (params) => {
      const schoolCode = params["schoolCode"];
      const userName = params["userName"];
      // const password = params["password"];
      const academicYear = params["academicyear"];

      // You can now use these parameters in your component logic
      console.log("School Code:", schoolCode);
      console.log("User Name:", userName);
      // console.log("Password:", password);
      console.log("Academic Year:", academicYear);
      let postData = {
        userName: userName,
        // password: password,
        schoolCode: schoolCode,
        academicYear: academicYear,
      };

      let data = await this.authService
        .postHttpServicesighIn(postData, "usersLogin")
        .toPromise();
      if (data.status) {
        this.getShiftList();
        // this.ViewTimetableClasswise();
        this.loader.hide();
      } else {
        this.loader.hide();
        this.router.navigate(['/error'])
      }
      this.cdr.detectChanges();
    });
  }

  getShiftList() {
    let postData = {
      schoolcode: localStorage.getItem("schoolcode"),
    };
    this.service
      .getHttpServiceWithDynamicParams(postData, "getCombinedShiftList")
      .subscribe((response) => {
        if (response.status) {
          this.shiftList = response.resultData;
          this.shiftId =
            this.shiftList.length > 0 ? this.shiftList[0].sftid : "";
          console.log("this.shiftId", this.shiftId);

        }
        if (this.checkedOption === "General") {
          this.getProcessTimetableList();
        } else if (this.checkedOption === "ByClass") {
          this.ViewTimetableClasswise();
        } else if (this.checkedOption === "ByStaff") {
          this.ViewTimetableStaffwise();
        } else if (this.checkedOption === "BySubject") {
          this.getpagingList();
          this.ViewTimetableSubjectwise();
        }
        this.cdr.detectChanges();
      });
  }

  getpagingList() {
    this.loader.show();
    let postData = {
      schoolcode: localStorage.getItem("schoolcode"),
      shiftId: this.shiftId,
    };

    console.log("shiftid", this.shiftId);

    this.service
      .getHttpServiceWithDynamicParams(postData, "getpagingList")
      .subscribe((response) => {
        if (response.status) {
          this.pageList = response.resultData;
          console.log("pageinglist", this.pageList);
          // Check if the shift ID has changed since the last selection
          if (this.shiftId !== this.previousShiftId) {
            // Automatically select the first option
            if (this.pageList.length > 0) {
              // Assuming your pageList has an identifier for each option, replace 'id' with your identifier
              const firstOptionId = this.pageList[0].id;
              // Update the value of your selection
              this.selectedOption = firstOptionId;
            }
          }
          // Update the previous shift ID
          this.previousShiftId = this.shiftId;
          if (this.checkedOption === "BySubject") {
            this.ViewTimetableSubjectwise();
          }
        }
        this.cdr.detectChanges();

        // this.loader.hide();
      });
  }

 

  ViewTimetableClasswise() {
    this.timetableview = "class";
    this.loader.show();
    let postData = {
      schoolcode: localStorage.getItem("schoolcode"),
      // shiftId: this.shiftId,
    };

    this.service
      .getHttpServiceWithDynamicParams(postData, "ViewTimetableClasswise")
      .subscribe(
        (response: any) => {
          if (response.status) {
            this.timetableList = this.sanitizer.bypassSecurityTrustHtml(
              response.resultData
            );
            this.timetableName = response.timetableName;
            this.ttlPercentage = response.ttlPercentage;

            this.loader.hide();
          } else {
            // Handle the case where no data is found
            this.timetableList = ""; // Set timetableList to null or an empty array, whichever you prefer
            this.timetableName = ""; // Clear the timetableName
            this.ttlPercentage = ""; // Clear the ttlPercentage
            this.loader.hide();
          }
          this.cdr.detectChanges();
        },
        (error) => {
          // Handle API error here and show an alert
          console.error("API Error:", error);
          this.loader.hide();

          // Show an alert using a library like Swal (SweetAlert2) or your preferred alert mechanism
          Swal.fire({
            title: "API Error",
            text: "An error occurred while fetching data from the API.",
            icon: "error",
            // timer: 3000 // Adjust the timer as needed
          });
        }
      );
  }
  ViewTimetableStaffwise() {
    this.timetableview = "staff";

    this.loader.show();
    let postData = {
      schoolcode: localStorage.getItem("schoolcode"),
    };

    this.service
      .getHttpServiceWithDynamicParams(postData, "ViewTimetableStaff")
      .subscribe(
        (response: any) => {
          if (response.status) {
            this.timetableList = this.sanitizer.bypassSecurityTrustHtml(
              response.resultData
            );
            this.timetableName = response.timetableName;
            this.ttlPercentage = response.ttlPercentage;
            this.loader.hide();
          } else {
            // Handle the case where no data is found
            this.timetableList = ""; // Set timetableList to null or an empty array, whichever you prefer
            this.timetableName = ""; // Clear the timetableName
            this.ttlPercentage = ""; // Clear the ttlPercentage
            this.loader.hide();
          }
          this.cdr.detectChanges();
        },
        (error) => {
          // Handle API error here and show an alert
          console.error("API Error:", error);
          this.loader.hide();

          // Show an alert using a library like Swal (SweetAlert2) or your preferred alert mechanism
          Swal.fire({
            title: "API Error",
            text: "An error occurred while fetching data from the API.",
            icon: "error",
            // timer: 3000 // Adjust the timer as needed
          });
        }
      );
  }
  ViewTimetableSubjectwise() {
    this.timetableview = "subject";

    this.loader.show();
    let postData = {
      schoolcode: localStorage.getItem("schoolcode"),
      shiftid: this.shiftId,
      pageno: this.selectedOption,
    };

    this.service
      .getHttpServiceWithDynamicParams(postData, "ViewTimetableSubjectwise")
      .subscribe(
        (response: any) => {
          if (response.status) {
            this.timetableList = this.sanitizer.bypassSecurityTrustHtml(
              response.resultData
            );
            // this.timetableList = this.sanitizer.bypassSecurityTrustHtml(
            //   " <html><head></head><body>  <style  type='text/css'> /* CSS Document */ body { margin:0px;padding:0px;} .tblBorder { /*background-color: #BED9EE;*/ border: 1px solid #BED9EE;}  #ttlview td{border: 1px solid #BED9EE;} #ttlborder td{border: 1px solid #BED9EE;} /* Used for fee structure definition */  .subtitle {font-family:Arial;font-size:13px;line-height:20px;color:#121C8B;font-weight:bold;text-align: left;padding: 3px 5px;}  .title1 {font-family:Arial;font-size:15px;line-height:20px;color: #AD1010;text-align: left;padding-right: 5px;padding-left: 5px;padding-top: 3px;}  .menu1 {font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 11px;line-height: 20px;font-weight: bold;color: #FFFFFF;text-decoration: none;text-align: left;padding-right: 3px;padding-left: 3px;}  .Border {background-color: #F3FBFE;border: 1px solid #BCE2F9;}  .CerTableBorder {background-color: #F3FBFE;border: 1px solid ##333333;}  .tblTitle {font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 12px;line-height: 20px;/*font-weight: bold;*/color: #000000;text-decoration: none;padding: 3px;background-color: #9CC1E2;}  .tblText {font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 12px;color: #000000;text-decoration: none;padding: 3px;background-color: #FFFFFF;text-align: left;vertical-align: top;}  .tblBreak{font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 12px;line-height: 20px;text-decoration: none;padding: 3px;background-color: darkgray;vertical-align: middle;text-align: center;}  .tblSubstitute{font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 12px;line-height: 20px;color: #000000;text-decoration: none;padding: 3px;background-color: aquamarine;}  .tblReserve {font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 12px;line-height: 20px;color: #000000;text-decoration: none;padding: 3px;background-color: Lavender;}  .tblStfComb {font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 12px;line-height: 20px;color: #000000;text-decoration: none;padding: 3px;background-color: Ivory;}  .tblCombCont {font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 12px;line-height: 20px;color: #000000;text-decoration: none;padding: 3px;background-color: Yellow;}  .tblCell{font-family: Goudy Old Style, Arial, Helvetica, sans-serif;font-size: 12px;color: #000000;text-decoration: none;padding: 3px;background-color: lavender;text-align: left;vertical-align: top;}  .tblHighlight{font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 12px;text-decoration: none;padding: 3px;background-color: lightgoldenrodyellow;text-align: left;vertical-align: top;}  .tblGeneral {font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 12px;color: peru;text-decoration: none;padding: 3px;background-color: #FFFFFF;text-align: left;vertical-align: top;}  .tblName {font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 12px;font-weight: bold;color: #000000;text-decoration: none;width: 150px;float: left;}  .tblvTitle {font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 12px;line-height: 20px;font-weight: bold;color: #000000;text-decoration: none;padding: 3px;background-color: #D9E8F4;} </style> <table width=100% border=0 cellpadding=0 cellspacing=0 class=tblBorder id=ttlview><tr><td class=subtitle colspan=5>API Class A</td></tr><tr><tr><th width=6% class=tblTitle><strong>Days_Periods</strong></th> <th width=23% class=tblTitle><strong>1</strong></th> <th width=23% class=tblTitle><strong>2</strong></th> <th width=23% class=tblTitle><strong>3</strong></th> <th width=23% class=tblTitle><strong>4</strong></th> </tr><tr><td width=6% class=tblvTitle>Day 1</td> <td width=23% class=tblReserve>ENG (BKMHSS20) </td><td width=23% class=tblBreak>Break</td><td width=23% class=tblCombCont>MAT (BKMHSS140) </td><td width=23% class=tblStfComb>MAT (BKMHSS140) </td></tr><tr><td width=6% class=tblvTitle>Day 2</td> <td width=23% class=tblReserve>ENG (BKMHSS20) </td><td width=23% class=tblBreak>Break</td><td width=23% class=tblCombCont>MAT (BKMHSS140) </td><td width=23% class=tblText>TAM (BKMHSS136) </td></tr><tr><td width=6% class=tblvTitle>Day 3</td> <td width=23% class=tblReserve>ENG (BKMHSS20) </td><td width=23% class=tblBreak>Break</td><td width=23% class=tblText>&nbsp;</td><td width=23% class=tblText>MAT (BKMHSS140) </td></tr><tr><td width=6% class=tblvTitle>Day 4</td> <td width=23% class=tblReserve>ENG (BKMHSS20) </td><td width=23% class=tblBreak>Break</td><td width=23% class=tblText>&nbsp;</td><td width=23% class=tblText>MAT (BKMHSS140) </td></tr><tr><td width=6% class=tblvTitle>Day 5</td> <td width=23% class=tblReserve>ENG (BKMHSS20) </td><td width=23% class=tblBreak>Break</td><td width=23% class=tblText>&nbsp;</td><td width=23% class=tblCombCont>ENG (BKMHSS20) </td></tr></table>  </body></html>"
            // );
            this.timetableName = response.timetableName;
            this.ttlPercentage = response.ttlPercentage;
            this.loader.hide();
          } else {
            // Handle the case where no data is found
            this.timetableList = ""; // Set timetableList to null or an empty array, whichever you prefer
            this.timetableName = ""; // Clear the timetableName
            this.ttlPercentage = ""; // Clear the ttlPercentage
            this.loader.hide();
          }
          this.cdr.detectChanges();
        },
        (error) => {
          // Handle API error here and show an alert
          console.error("API Error:", error);
          this.loader.hide();

          // Show an alert using a library like Swal (SweetAlert2) or your preferred alert mechanism
          Swal.fire({
            title: "API Error",
            text: "An error occurred while fetching data from the API.",
            icon: "error",
            // timer: 3000 // Adjust the timer as needed
          });
        }
      );
  }
  // pdf download
  printpdf() {
    let divToPrint = document.getElementById("divToPrint")!;
    let content = divToPrint.innerHTML;
    let newWindow = window.open(
      "",
      "_blank",
      "top=0,left=0,height=100%,width=auto"
    );
    if (newWindow && newWindow.document) {
      newWindow.document.open();
      newWindow.document.write(`
      <html>
          <head>
            <title>Print tab</title>
            <style>
            .printbg{ display:none;}
            </style>
          </head>
          <body onload="window.print();window.close()">${content}   
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  }
  downloadDocument(): void {
    let content = document.getElementById("docx")!.innerHTML; // Adjust accordingly

    const styles = `
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
        table-layout: fixed;
      }

      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }

      tr:nth-child(even) {
        background-color: #dddddd;
      }
    `;

    const css = `
      <style>
        @page WordSection1 { size: 1190pt 842pt; mso-page-orientation: landscape; }
        div.WordSection1 { page: WordSection1; }
        ${styles}
      </style>
    `;

    const html = `<html><head><title>Word Document</title>${css}</head><body>${content}</body></html>`;
    const blob = new Blob(["\ufeff", html], { type: "application/msword" });

    saveAs(blob, "Timetable.doc");
  }

   downloadAsExcel() {
    const content = document.getElementById("exceldownload"); // Get the HTML container element

    if (content instanceof HTMLElement) { // Check if the content is an HTML element
        const tables = content.querySelectorAll("table"); // Find all tables within the content

        if (tables.length > 0) { // If tables are found
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("CombinedSheet"); // Create a single worksheet for all tables
            let currentRowIndex = 1; // Initialize the current row index
            let maxColIndex = 1; // Initialize the maximum column index

            tables.forEach((table, tableIndex) => {
                // Add an empty row between tables
                if (tableIndex > 0) {
                    currentRowIndex += 2; // Add 2 to create an empty row
                }

                table.querySelectorAll("tr").forEach((row, rowIndex) => {
                    // Increase the row index for each new row
                    currentRowIndex++;

                    let currentColIndex = 1; // Reset the column index for each new row

                    row.querySelectorAll("td, th").forEach((cell, colIndex) => {
                        const bgColor = window.getComputedStyle(cell).backgroundColor;
                        const textContent = cell.textContent?.trim() || ''; // Use optional chaining and handle null case

                        const excelCell = worksheet.getCell(currentRowIndex, currentColIndex);
                        excelCell.value = textContent; // Value should not be null

                        const rgbValues = bgColor.match(/\d+/g);
                        if (rgbValues && rgbValues.length === 3) {
                            excelCell.fill = {
                                type: "pattern",
                                pattern: "solid",
                                fgColor: { argb: `FF${rgbValues.map(value => (+value).toString(16).padStart(2, "0")).join("")}` }
                            };
                        }

                        excelCell.border = {
                            top: { style: "thin", color: { argb: "ced4da" } },
                            left: { style: "thin", color: { argb: "ced4da" } },
                            bottom: { style: "thin", color: { argb: "ced4da" } },
                            right: { style: "thin", color: { argb: "ced4da" } }
                        };

                        currentColIndex++; // Move to the next column
                    });

                    // Update the maximum column index encountered
                    maxColIndex = Math.max(maxColIndex, currentColIndex);
                });
            });

            // Auto-adjust column widths based on content
            for (let colIndex = 1; colIndex <= maxColIndex; colIndex++) {
                let maxLength = 0;
                worksheet.eachRow({ includeEmpty: true }, (row, rowIndex) => {
                    const cell = row.getCell(colIndex);
                    if (cell && cell.text) {
                        const length = cell.text.length;
                        if (length > maxLength) {
                            maxLength = length;
                        }
                    }
                });
                worksheet.getColumn(colIndex).width = maxLength < 10 ? 10 : maxLength + 2;
            }

            // Write the workbook to a buffer and initiate download
            workbook.xlsx.writeBuffer().then(buffer => {
                const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = "Timetable.xlsx";
                link.click();
            });
        } else {
            console.error("No tables found in the 'exceldownload' element.");
        }
    } else {
        console.error("Element with id 'exceldownload' not found in the document.");
    }
}
}
