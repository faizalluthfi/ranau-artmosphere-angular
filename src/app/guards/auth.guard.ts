import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.user) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectURL = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login', { r: url }]);
    return false;
  }

}
