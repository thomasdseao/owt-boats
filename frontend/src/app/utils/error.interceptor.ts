import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthenticationService} from "../service/authentication.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  // Inject Router and AuthenticationService for navigation and authentication logic
  constructor(private router: Router, private authService: AuthenticationService) {
  }

  /**
   * Intercept HTTP request and error responses.
   * @param request The outgoing request object to handle.
   * @param next The HTTP request handler.
   * @returns An Observable for the event stream.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Use `next.handle()` to handle the request and proceed to the next interceptor if any
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => { // Handle errors using `catchError` operator
        if (error.status === 403 && error.error?.message === "Unauthorized") { // Check if status code is 403 Unauthorized
          this.authService.logout(); // Logout the user
          this.router.navigate(['/authentication/login']); // Navigate to login
        }
        return throwError(error); // Re-throw the error to allow other catch blocks to handle it
      })
    );
  }
}
