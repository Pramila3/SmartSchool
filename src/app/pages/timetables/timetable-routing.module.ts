import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateShiftTimingComponent } from './create-shift-timing/create-shift-timing.component';
import { AddShiftComponent } from './create-shift-timing/add-shift/add-shift.component';
import { RouterModule, Routes } from '@angular/router';
import { TimetablesComponent } from './timetables.component';
import { DefaultLayoutsComponent } from '../default-layouts/default-layouts.component';
import { AllotSubjectComponent } from './allot-subject/allot-subject.component';
import { StaffAllotmentComponent } from './staff-allotment/staff-allotment.component';
import { AddStaffAllotmentComponent } from './staff-allotment/add-staff-allotment/add-staff-allotment.component';
import { AllottingStaffComponent } from './staff-allotment/allotting-staff/allotting-staff.component';
import { ClasswiseStaffAllotmentComponent } from './classwise-staff-allotment/classwise-staff-allotment.component';
import { FixCriteriaComponent } from './fix-criteria/fix-criteria.component';
import { AddFixCriteriaComponent } from './fix-criteria/add-fix-criteria/add-fix-criteria.component';
import { SetCombinedContinuousComponent } from './set-combined-continuous/set-combined-continuous.component';
import { AddSetCombinedContinuousComponent } from './set-combined-continuous/add-set-combined-continuous/add-set-combined-continuous.component';
import { StaffCombinedCriteriaComponent } from './staff-combined-criteria/staff-combined-criteria.component';
import { AddStaffCombinedCriteriaComponent } from './staff-combined-criteria/add-staff-combined-criteria/add-staff-combined-criteria.component';
import { ImportTimeTableComponent } from './import-time-table/import-time-table.component';
import { ManualAdjustmentComponent } from './manual-adjustment/manual-adjustment.component';
import { TemporaryTimetableComponent } from './temporary-timetable/temporary-timetable.component';
import { StaffSubstitudeComponent } from './staff-substitude/staff-substitude.component';
import { AddStaffSubstitudeComponent } from './staff-substitude/add-staff-substitude/add-staff-substitude.component';
import { OnlineMonitorComponent } from './online-monitor/online-monitor.component';
import { StaffReplacementComponent } from './staff-replacement/staff-replacement.component';
import { SearchStaffstudentComponent } from './search-staffstudent/search-staffstudent.component';
import { CustomizationComponent } from './customization/customization.component';
import { ProcessTimetableComponent } from './process-timetable/process-timetable.component';
import { ByClassComponent } from './by-class/by-class.component';
import { ByStaffComponent } from './by-staff/by-staff.component';
import { BySubjectComponent } from './by-subject/by-subject.component';
import { SelectedStaffSubstituteComponent } from './staff-substitude/selected-staff-substitute/selected-staff-substitute.component';


const routes: Routes = [

  // { path: 'timetables', component: TimetablesComponent },
  {
    path: '', component: DefaultLayoutsComponent,


    children: [
      {
        path: "timetables",
        component: TimetablesComponent,
      },
      {
        path: "CreateShiftTiming",
        component: CreateShiftTimingComponent,
      },
      {
        path: "Addshift",
        component: AddShiftComponent,
      },
      {
        path: "AllotSubject",
        component: AllotSubjectComponent
      },
      {
        path: "StaffAllotment",
        component: StaffAllotmentComponent
      },
      {
        path: "AddStaffAllotment",
        component: AddStaffAllotmentComponent
      },
      {
        path: "AllottingStaff",
        component: AllottingStaffComponent
      },
      {
        path: "ClasswiseStaffAllotment",
        component: ClasswiseStaffAllotmentComponent
      },
      {
        path: "FixCriteria",
        component: FixCriteriaComponent
      },
      {
        path: "AddFixCriteria",
        component: AddFixCriteriaComponent
      },
      {
        path: "SetCombinedContinuous",
        component: SetCombinedContinuousComponent
      },
      {
        path: "AddSetCombinedContinuous",
        component: AddSetCombinedContinuousComponent
      },
      {
        path: "StaffCombinedCriteria",
        component: StaffCombinedCriteriaComponent
      },
      {
        path: "AddStaffCombinedCriteria",
        component: AddStaffCombinedCriteriaComponent
      },
      {
        path: "ManualAdjustment",
        component: ManualAdjustmentComponent
      },
      {
        path: "ImportTimeTable",
        component: ImportTimeTableComponent
      },
      {
        path: "TemporaryTimetable",
        component: TemporaryTimetableComponent
      },
      {
        path: "StaffSubstitude",
        component: StaffSubstitudeComponent
      },
      {
        path: "AddStaffSubstitude",
        component: AddStaffSubstitudeComponent
      },
      {
        path: "OnlineMonitor",
        component: OnlineMonitorComponent
      },
      {
        path: "StaffReplacement",
        component: StaffReplacementComponent
      },
      {
        path: "SearchStaffstudent",
        component: SearchStaffstudentComponent
      },
      {
        path: "Customization",
        component: CustomizationComponent
      },
      {
        path: "ProcessTimetable",
        component: ProcessTimetableComponent
      },
      {
        path: "timetablebyclass",
        component: ByClassComponent
      },
      {
        path: "timetablebystaff",
        component: ByStaffComponent
      },
      {
        path: "timetablebysubject",
        component: BySubjectComponent
      },
      {
        path: "selectedstafflist",
        component: SelectedStaffSubstituteComponent
      }
    ],

  },


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimetableRoutingModule { }
