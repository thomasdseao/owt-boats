import {Injectable, EventEmitter} from '@angular/core';

/**
 * Enum to define the types of toasts
 */
export enum ToastType {
  Success = 'success',
  Error = 'error'
}

/**
 * ToastService is responsible for emitting events that trigger toast notifications.
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {

  // EventEmitter to trigger the display of a toast.
  public toastTriggered: EventEmitter<{ message: string, type: ToastType }> = new EventEmitter();

  /**
   * Emit an event to show a toast with the given message and type.
   *
   * @param {string} message
   * @param {ToastType} type
   */
  show(message: string, type: ToastType): void {
    this.toastTriggered.emit({message, type});
  }
}
