import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { Error404Component } from './login/error404/error404.component';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  // {
  //   path: 'login', component: LoginComponent,
  //   data: { returnUrl: window.location.pathname }
  // },
  {
    path: 'error', component: Error404Component,
    data: { returnUrl: window.location.pathname }
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    // canActivate: [AuthGuard]

  },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'login', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
