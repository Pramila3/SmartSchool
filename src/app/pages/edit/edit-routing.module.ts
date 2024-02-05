import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutsComponent } from '../default-layouts/default-layouts.component';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { AddApplicantListComponent } from './applicant-list/add-applicant-list/add-applicant-list.component';
import { ConductInterviewComponent } from './applicant-list/conduct-interview/conduct-interview.component';
import { InterviewRecordComponent } from './interview-record/interview-record.component';


const routes: Routes = [
  {
    path: '', component: DefaultLayoutsComponent,

    children: [
      {
        path: "applicantlist",
        component: ApplicantListComponent,
      },
      {
        path: "addapplicantlist",
        component: AddApplicantListComponent,
      },
      {
        path: "ConductInterview",
        component: ConductInterviewComponent
      },
      {
        path: "InterviewRecord",
        component: InterviewRecordComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule { }
