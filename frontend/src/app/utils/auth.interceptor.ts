import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Intercepts outgoing HTTP requests and adds an Authorization header if an auth token exists.
   * @param request The outgoing request object to handle.
   * @param next The HTTP request handler.
   * @returns An Observable for the event stream.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Retrieve the auth token from local storage.
    const authToken = localStorage.getItem('auth_token');
    // Check if the auth token exists.
    if (authToken) {
      // Clone the request and set the Authorization header.
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`)
      });
      // Handle the cloned request.
      return next.handle(authReq);
    } else {
      // Handle the original request.
      return next.handle(request);
    }
  }
}
