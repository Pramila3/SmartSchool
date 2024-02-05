import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutsComponent } from './default-layouts/default-layouts.component';
import { PagesRoutingModule } from './pages-routing.module';
import { TimetablesComponent } from './timetables/timetables.component';
import { StudentsComponent } from './students/students.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TimetableModule } from './timetables/timetable.module';
import { MatMenuModule } from '@angular/material/menu';
import { LoaderComponent } from './common/loading/loader.component';
import { EditModule } from './edit/edit.module';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    DefaultLayoutsComponent,
    // TimetablesComponent,
    HomeComponent,
    StudentsComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    TimetableModule,
    MatMenuModule,
    EditModule,
    MatSidenavModule
  ],
  exports: [LoaderComponent]
})
export class PagesModule { }
