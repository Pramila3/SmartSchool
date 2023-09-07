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
import { CreateShiftTimingComponent, ImportShiftTimingModal } from './create-shift-timing/create-shift-timing.component';
import { AddShiftComponent } from './create-shift-timing/add-shift/add-shift.component';
import { TimetablesComponent } from './timetables.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MobiscrollModule } from '@mobiscroll/angular';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { AllotSubjectComponent } from './allot-subject/allot-subject.component';
import { StaffAllotmentComponent } from './staff-allotment/staff-allotment.component';
import { AddStaffAllotmentComponent } from './staff-allotment/add-staff-allotment/add-staff-allotment.component';
import { AllottingStaffComponent, NewSingleStaffallotmentmodal } from './staff-allotment/allotting-staff/allotting-staff.component';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatDialogModule } from '@angular/material/dialog';
import { ClasswiseStaffAllotmentComponent } from './classwise-staff-allotment/classwise-staff-allotment.component';
import { FixCriteriaComponent } from './fix-criteria/fix-criteria.component';
import { AddFixCriteriaComponent } from './fix-criteria/add-fix-criteria/add-fix-criteria.component';

import { SetCombinedContinuousComponent } from './set-combined-continuous/set-combined-continuous.component';
import { AddSetCombinedContinuousComponent } from './set-combined-continuous/add-set-combined-continuous/add-set-combined-continuous.component';
import { StaffCombinedCriteriaComponent } from './staff-combined-criteria/staff-combined-criteria.component';
import { AddStaffCombinedCriteriaComponent } from './staff-combined-criteria/add-staff-combined-criteria/add-staff-combined-criteria.component';
import { ImportTimeTableComponent } from './import-time-table/import-time-table.component';
import { ManualAdjustmentComponent } from './manual-adjustment/manual-adjustment.component';
import { AddTemporaryTimetablemodal, TemporaryTimetableComponent } from './temporary-timetable/temporary-timetable.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StaffSubstitudeComponent } from './staff-substitude/staff-substitude.component';
import { CdkDrag, CdkDropList, CdkDropListGroup, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AddStaffSubstitudeComponent } from './staff-substitude/add-staff-substitude/add-staff-substitude.component';
import { OnlineMonitorComponent } from './online-monitor/online-monitor.component';
import { StaffReplacementComponent } from './staff-replacement/staff-replacement.component';
import { SearchStaffstudentComponent } from './search-staffstudent/search-staffstudent.component';
import { CustomizationComponent } from './customization/customization.component';
import { ProcessTimetableComponent } from './process-timetable/process-timetable.component';
import { ByClassComponent } from './by-class/by-class.component';
import { ByStaffComponent } from './by-staff/by-staff.component';
import { BySubjectComponent } from './by-subject/by-subject.component';
import { DatePipe } from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    CreateShiftTimingComponent,
    AddShiftComponent,
    TimetablesComponent,
    AllotSubjectComponent,
    StaffAllotmentComponent,
    AddStaffAllotmentComponent,
    AllottingStaffComponent,
    NewSingleStaffallotmentmodal,
    ImportShiftTimingModal,
    ClasswiseStaffAllotmentComponent,
    FixCriteriaComponent,
    AddFixCriteriaComponent,
    SetCombinedContinuousComponent,
    AddSetCombinedContinuousComponent,
    StaffCombinedCriteriaComponent,
    AddStaffCombinedCriteriaComponent,
    ImportTimeTableComponent,
    ManualAdjustmentComponent,
    TemporaryTimetableComponent,
    AddTemporaryTimetablemodal,
    StaffSubstitudeComponent,
    AddStaffSubstitudeComponent,
    OnlineMonitorComponent,
    StaffReplacementComponent,
    SearchStaffstudentComponent,
    CustomizationComponent,
    ProcessTimetableComponent,
    ByClassComponent,
    ByStaffComponent,
    BySubjectComponent,
    

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
    BrowserModule,
    MatDatepickerModule, MatNativeDateModule,
    MatDialogModule,
    DragDropModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [
    DatePipe, // Add DatePipe to the providers array
  ],
})
export class TimetableModule { }
