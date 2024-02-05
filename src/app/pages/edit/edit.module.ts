import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TimetableRoutingModule } from '../timetables/timetable-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddApplicantListComponent } from './applicant-list/add-applicant-list/add-applicant-list.component';
import { ConductInterviewComponent } from './applicant-list/conduct-interview/conduct-interview.component';
import { InterviewRecordComponent } from './interview-record/interview-record.component';



@NgModule({
  declarations: [
    ApplicantListComponent,
    AddApplicantListComponent,
    ConductInterviewComponent,
    InterviewRecordComponent
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
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
    // BrowserModule,
    MatDatepickerModule, MatNativeDateModule,
    MatDialogModule,
    DragDropModule,
    
  ]
})
export class EditModule { }
