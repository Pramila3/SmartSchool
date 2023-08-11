import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateShiftTimingComponent } from './create-shift-timing/create-shift-timing.component';
import { AddShiftComponent } from './create-shift-timing/add-shift/add-shift.component';
import { RouterModule, Routes } from '@angular/router';
import { TimetablesComponent } from './timetables.component';
import { DefaultLayoutsComponent } from '../default-layouts/default-layouts.component';

const routes: Routes = [

  // { path: 'timetables', component: TimetablesComponent },
  {
    path: '', component: DefaultLayoutsComponent,


    children: [
      {
        path: "CreateShiftTiming",
        component: CreateShiftTimingComponent,
      },
      {
        path: "Addshift",
        component: AddShiftComponent,
      },

    ],

  },


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TimetableRoutingModule { }
