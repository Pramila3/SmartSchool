import { Component, OnInit, AfterViewInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import Swal from 'sweetalert2';
declare var $: any; // Declare jQuery globally (not recommended, but works for demonstration)
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { CommonService } from '../../services/common.service';
import { LoaderService } from '../../common/loading/loader.service';
@Component({
  selector: 'app-by-class',
  templateUrl: './by-class.component.html',
  styleUrls: ['./by-class.component.scss']
})
export class ByClassComponent implements OnInit {

  timetableList: any;
  timetableName: any;
  ttlPercentage: any;

  constructor(private service: CommonService, private fb: FormBuilder, private sanitizer: DomSanitizer, private loader: LoaderService) { }

  ngOnInit(): void {
    this.ViewTimetableClasswise()
  }
  showTab(tabId: string): void {
    const tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => tab.classList.remove('active'));

    const tabContent = document.querySelector(tabId);
    if (tabContent) {
      tabContent.classList.add('show', 'active');
    }
  }

  ViewTimetableClasswise() {
    this.loader.show();
    let postData = {
      schoolcode: localStorage.getItem('schoolcode')
    }

    this.service.getHttpServiceWithDynamicParams(postData, 'ViewTimetableClasswise').subscribe(
      (response: any) => {
        if (response.status) {
          this.timetableList = this.sanitizer.bypassSecurityTrustHtml(response.resultData);
          this.timetableName = response.timetableName;
          this.ttlPercentage = response.ttlPercentage;
          this.loader.hide();
        } else {
          // Handle the case where no data is found
          this.timetableList = ''; // Set timetableList to null or an empty array, whichever you prefer
          this.timetableName = ''; // Clear the timetableName
          this.ttlPercentage = ''; // Clear the ttlPercentage
          this.loader.hide();
        }
      },
      (error) => {
        // Handle API error here and show an alert
        console.error('API Error:', error);
        this.loader.hide();

        // Show an alert using a library like Swal (SweetAlert2) or your preferred alert mechanism
        Swal.fire({
          title: "API Error",
          text: "An error occurred while fetching data from the API.",
          icon: 'error',
          // timer: 3000 // Adjust the timer as needed
        });
      }
    );
  }
  ViewTimetableStaffwise() {
    this.loader.show();
    let postData = {
      schoolcode: localStorage.getItem('schoolcode')
    }

    this.service.getHttpServiceWithDynamicParams(postData, 'ViewTimetableStaff').subscribe(
      (response: any) => {
        if (response.status) {
          this.timetableList = this.sanitizer.bypassSecurityTrustHtml(response.resultData);
          this.timetableName = response.timetableName;
          this.ttlPercentage = response.ttlPercentage;
          this.loader.hide();
        } else {
          // Handle the case where no data is found
          this.timetableList = ''; // Set timetableList to null or an empty array, whichever you prefer
          this.timetableName = ''; // Clear the timetableName
          this.ttlPercentage = ''; // Clear the ttlPercentage
          this.loader.hide();
        }
      },
      (error) => {
        // Handle API error here and show an alert
        console.error('API Error:', error);
        this.loader.hide();

        // Show an alert using a library like Swal (SweetAlert2) or your preferred alert mechanism
        Swal.fire({
          title: "API Error",
          text: "An error occurred while fetching data from the API.",
          icon: 'error',
          // timer: 3000 // Adjust the timer as needed
        });
      }
    );
  }
  ViewTimetableSubjectwise() {
    this.loader.show();
    let postData = {
      schoolcode: localStorage.getItem('schoolcode')
    }

    this.service.getHttpServiceWithDynamicParams(postData, 'ViewTimetableSubjectwise').subscribe(
      (response: any) => {
        if (response.status) {
          this.timetableList = this.sanitizer.bypassSecurityTrustHtml(response.resultData);
          this.timetableName = response.timetableName;
          this.ttlPercentage = response.ttlPercentage;
          this.loader.hide();
        } else {
          // Handle the case where no data is found
          this.timetableList = ''; // Set timetableList to null or an empty array, whichever you prefer
          this.timetableName = ''; // Clear the timetableName
          this.ttlPercentage = ''; // Clear the ttlPercentage
          this.loader.hide();
        }
      },
      (error) => {
        // Handle API error here and show an alert
        console.error('API Error:', error);
        this.loader.hide();

        // Show an alert using a library like Swal (SweetAlert2) or your preferred alert mechanism
        Swal.fire({
          title: "API Error",
          text: "An error occurred while fetching data from the API.",
          icon: 'error',
          // timer: 3000 // Adjust the timer as needed
        });
      }
    );
  }
  // pdf download
  printpdf() {
    let divToPrint = document.getElementById('divToPrint')!;
    let content = divToPrint.innerHTML;
    let newWindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
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
    let content = document.getElementById('docx')!.innerHTML; // Adjust accordingly

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
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });

    saveAs(blob, 'Timetable.doc');
  }
  downloadAsExcel(): void {
    const content = document.getElementById('exceldownload'); // Adjust accordingly

    if (content instanceof HTMLElement) {
      const table = content.querySelector('table');
      
      if (table) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.table_to_sheet(table);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Use XLSX.writeFile instead of XLSX.write
        XLSX.writeFile(wb, 'Timetable.xlsx');
      } else {
        console.error("No table found in the 'docx' element.");
      }
    } else {
      console.error("Element with id 'docx' not found in the document.");
    }
  }
  
  
}
