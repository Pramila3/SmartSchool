import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-layouts',
  templateUrl: './default-layouts.component.html',
  styleUrls: ['./default-layouts.component.scss']
})
export class DefaultLayoutsComponent implements OnInit {
  showFiller = false;
  moduleName!: any
  isDropdownOpen: boolean = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  @Output() closeDropdownEvent = new EventEmitter<void>();

  closeDropdown() {
    this.closeDropdownEvent.emit();
  }

  isSidebarOpen: boolean = true;
 

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  constructor(private router: Router) {

  }
  isViewMenuActive() {
    // Check if the current route matches the "View" menu's route
    return this.router.isActive('/view', true);
  }
  ngOnInit(): void {
    this.moduleName = localStorage.getItem('modulName');
  }
  navigationFunction() {
    this.moduleName = localStorage.getItem('modulName');
    this.router.navigate(['/timetables'])
    console.log(this.moduleName);
  }
  logout() {
    localStorage.removeItem('modulName');
    localStorage.removeItem('Access-Token');
    localStorage.removeItem('');
    console.log(localStorage.getItem('Access-Token'));

    this.router.navigate(['/'])
  }
}
