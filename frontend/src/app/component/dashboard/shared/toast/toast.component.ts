// Angular Core imports
import {Component, Input, Output, EventEmitter} from '@angular/core';

// Project specific imports
import {ToastType} from '../../../../service/toast.service';

/**
 * ToastComponent is responsible for displaying a toast notification.
 */
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {

  // Inputs for component configuration
  @Input() message: string = '';
  @Input() show: boolean = false;
  @Input() type: ToastType = ToastType.Success;

  // Outputs for component events
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  // For internal use, make ToastType available in the template
  protected readonly ToastType = ToastType;

  /**
   * Emit a close event to signal that the toast should be closed.
   */
  closeToast(): void {
    this.close.emit();
  }
}
