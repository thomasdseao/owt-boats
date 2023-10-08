import {Component, Output, Input, EventEmitter, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-confirm-danger',
  templateUrl: './confirm-danger.component.html'
})
export class ConfirmDangerComponent {
  // Inputs: message to display and visibility of the component
  @Input() message: string = 'Do you really want to perform this action?';
  @Input() show: boolean = false;

  // Outputs: actions for confirm and cancel events
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  // A function reference to unregister the global click listener
  private globalClickListener?: Function;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  // Lifecycle hooks
  ngOnInit(): void {
    // If the component is set to show, attach a global click listener
    if (this.show) {
      this.attachGlobalClickListener();
    }
  }

  ngOnDestroy(): void {
    // Clean up the global click listener when the component is destroyed
    if (this.globalClickListener) {
      this.globalClickListener();
    }
  }

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }

  // Attach a global click listener to detect outside clicks
  private attachGlobalClickListener(): void {
    setTimeout(() => {
      this.globalClickListener = this.renderer.listen('document', 'click', (event) => {
        // If clicked outside the element, trigger the cancel event
        if (!this.el.nativeElement.contains(event.target)) {
          this.onCancel();
        }
      });
    }, 100);
  }
}
