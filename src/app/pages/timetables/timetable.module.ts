import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TimetableRoutingModule } from './timetable-routing.module';
import { CreateShiftTimingComponent } from './create-shift-timing/create-shift-timing.component';
import { AddShiftComponent } from './create-shift-timing/add-shift/add-shift.component';
import { TimetablesComponent } from './timetables.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MobiscrollModule } from '@mobiscroll/angular';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    CreateShiftTimingComponent,
    AddShiftComponent,
    TimetablesComponent

  ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    TimetableRoutingModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    BrowserModule
    // NgMultiSelectDropDownModule
  ]
})
export class TimetableModule { }
