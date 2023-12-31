import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
    console.log(this.authService.accessToken);

  }
  canActivate() {
    if (this.authService.accessToken) {
      return true;

    } else {
      this.router.navigate(['/'])
      return false;

    }
  }

}
