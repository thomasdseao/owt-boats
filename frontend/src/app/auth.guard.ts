import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {AuthenticationService} from "./service/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * Constructs the AuthGuard and injects the AuthenticationService and Router.
   * @param authService The service for handling authentication.
   * @param router Router service.
   */
  constructor(private authService: AuthenticationService, private router: Router) {
  }

  /**
   * Determines if a route can be activated.
   * @param route The active route snapshot.
   * @param state The router state snapshot.
   * @returns An observable emitting a boolean indicating if the route can be activated.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLoggedIn(state.url);
  }

  /**
   * Checks if the user is logged in and navigates to login page if not.
   * @param url The URL user is trying to access.
   * @returns An observable emitting a boolean indicating if the user is logged in.
   */
  checkLoggedIn(url: string): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      take(1),  // Take the first emitted value then complete
      map(isAuth => {
        if (isAuth) {
          return true;
        }
        // Navigate to login page if not authenticated
        this.router.navigate(['/authentication/login']);
        return false;
      })
    );
  }
}
