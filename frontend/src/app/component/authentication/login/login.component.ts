import {Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../../../service/authentication.service";
import {Router} from "@angular/router";
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  // Form Group for the login form
  loginForm: FormGroup;
  
  // Flags and Observables for UI states
  isLoading: boolean = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoading);

  errorMessage: string = "";
  errorMessage$: BehaviorSubject<string> = new BehaviorSubject<string>(this.errorMessage);

  // Subscription to manage the authentication state
  private isAuthenticatedSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    // Initialize login form with validations
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Subscribe to authentication state
    this.isAuthenticatedSubscription = this.authService.isAuthenticated.subscribe(authenticated => {
      if (authenticated) {
        this.router.navigate(['/dashboard/boats/list']);
      }
    });
  }

  login(): void {
    // Check if the form is valid
    if (this.loginForm.valid) {
      // Set the loading state
      this.isLoading$.next(true);
      // Clear any existing error messages
      this.errorMessage$.next("");
      // Call the login function from the auth service
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        () => {
          // On successful login, navigate to dashboard
          this.router.navigate(['/dashboard/boats/list']);
        },
        (error) => {
          // On failure, update UI states
          this.isLoading$.next(false);
          this.errorMessage$.next(error.error?.message || 'An error occurred');
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.isAuthenticatedSubscription.unsubscribe();
  }
}
