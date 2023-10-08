import {Component, ElementRef, EventEmitter, Input, Output, Renderer2} from '@angular/core';
import {Boat} from "../../../../model/boat.model";
import {BehaviorSubject} from "rxjs";
import {BoatService} from "../../../../service/boat.service";
import {ToastService, ToastType} from "../../../../service/toast.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
// Input from the parent component
  @Input() boat!: Boat;
  @Input() show: boolean = false;

  // Outputs to communicate with the parent component
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  // State management for loading and error messages
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  // A function reference to unregister the global click listener
  private globalClickListener?: Function;

  constructor(
    private boatService: BoatService,
    private el: ElementRef,
    private renderer: Renderer2,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    // If the component is set to show, attach a global click listener
    if (this.show) {
      this.attachGlobalClickListener();
      this.fetchBoatDetails();
    }
  }

  ngOnDestroy(): void {
    // Clean up the global click listener when the component is destroyed
    if (this.globalClickListener) {
      this.globalClickListener();
    }
  }

  // Close the modal
  closeModal(): void {
    this.close.emit();
  }

  // Trigger a toast
  triggerToast(message: string, type: ToastType) {
    this.toastService.show(message, type);
  }

  // Fetch the boat details
  private fetchBoatDetails(): void {
    this.boatService.getBoat(this.boat.id).subscribe(
      (boat) => {
        this.boat = boat;
        this.isLoading$.next(false);
      },
      (error) => {
        this.closeModal();
        this.triggerToast(`Unable to load your boat`, ToastType.Error);
      }
    );
  }

  private attachGlobalClickListener(): void {
    setTimeout(() => {
      this.globalClickListener = this.renderer.listen('document', 'click', (event) => {
        // If clicked outside the element, trigger the cancel event
        if (!this.el.nativeElement.contains(event.target)) {
          this.closeModal();
        }
      });
    }, 100);
  }
}
