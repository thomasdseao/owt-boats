import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {Authentication} from "../model/authentication.model";
import {ApiResponse} from "../model/api-response.model";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // Subject to hold the state of authentication
  private isAuthenticatedSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // Public observable derived from the subject
  public isAuthenticated: Observable<boolean> = this.isAuthenticatedSubject$.asObservable();

  constructor(private http: HttpClient) {
    // Initialize the isAuthenticatedSubject$ based on presence of auth_token in local storage
    const token: string | null = localStorage.getItem('auth_token');
    this.isAuthenticatedSubject$.next(!!token);
  }

  /**
   * Authenticates a user by their email and password
   * @param email User's email
   * @param password User's password
   * @returns Observable of ApiResponse with Authentication data
   */
  login(email: string, password: string): Observable<ApiResponse<Authentication>> {
    return this.http.post<ApiResponse<Authentication>>(`${environment.apiUrl}/authentication/login`, {email, password})
      .pipe(
        map((response: ApiResponse<Authentication>) => {
          // Store received tokens and other data to local storage
          localStorage.setItem('email', email);
          localStorage.setItem('auth_token', response.data.access_token);
          localStorage.setItem('expires_at', response.data.expires_at);
          this.isAuthenticatedSubject$.next(true);
          return response;
        })
      );
  }

  /**
   * Logs out the user and clear token from local storage
   */
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('email');
    this.isAuthenticatedSubject$.next(false);
  }
}
