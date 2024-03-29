
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutsComponent } from './default-layouts/default-layouts.component';
import { StudentsComponent } from './students/students.component';
import { HomeComponent } from './home/home.component';
import { TimetableModule } from './timetables/timetable.module';
import { TimetablesComponent } from './timetables/timetables.component';




const routes: Routes = [

  {
    path: 'timetable',
    loadChildren: () =>
      import('../pages/timetables/timetable.module').then((m) => m.TimetableModule),
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

