import {Component, ElementRef, Renderer2, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {ToastService, ToastType} from "../../service/toast.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {
  // State variables for mobile and user menus
  showMobileMenu: boolean = false;
  showUserMenu: boolean = false;

  // Get user email from local storage
  userEmail: string | null = localStorage.getItem('email');

  // Toast errors and success messages
  toasts: { id: number; message: string; type: ToastType }[] = [];

  // Dependency injection
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private authService: AuthenticationService,
    private router: Router,
    private toastService: ToastService
  ) {
    // Listen to global click events to close the user menu when clicked outside
    this.renderer.listen('window', 'click', (event: Event) => {
      if (!(event.target as Element).closest('.menu-user')) {
        this.showUserMenu = false;
      }
    });
    // Toast service subscription
    this.toastService.toastTriggered.subscribe((toastData) => {
      // Generate a unique ID for the toast, you could use another method for this
      const toastId = new Date().getTime();

      // Add the new toast to the array
      this.toasts.push({
        id: toastId,
        message: toastData.message,
        type: toastData.type,
      });

      // Auto-hide after a few seconds
      setTimeout(() => {
        this.closeToast(toastId);
      }, 6000);
    });
  }

  // Track the toast by its ID
  trackByFn(index: any, item: any) {
    return item.id; // unique id corresponding to the item
  }
  
  // Close the toast
  closeToast(id: number): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  }

  // Perform logout and redirect to login page
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/authentication/login']);
  }

  // Toggle the visibility of the mobile menu
  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  // Toggle the visibility of the user menu, prevent event propagation to avoid conflict with global click
  toggleUserMenu(event: Event): void {
    event.stopPropagation();
    this.showUserMenu = !this.showUserMenu;
  }
}
