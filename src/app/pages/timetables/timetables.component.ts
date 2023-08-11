import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $: any; // Declare jQuery globally (not recommended, but works for demonstration)

@Component({
  selector: 'app-timetables',
  templateUrl: './timetables.component.html',
  styleUrls: ['./timetables.component.scss']
})
export class TimetablesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  showTab(tabId: string): void {
    const tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const tabContent = document.querySelector(tabId);
    if (tabContent) {
      tabContent.classList.add('show', 'active');
    }
  }
}
