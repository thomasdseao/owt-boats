import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BoatService} from "../../../../service/boat.service";
import {Boat} from "../../../../model/boat.model";
import {ToastService, ToastType} from "../../../../service/toast.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  // Input from the parent component
  @Input() boat!: Boat;

  // Outputs to communicate with the parent component
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  // Form to manage update actions
  public updateForm: FormGroup;

  // State management for loading and error messages
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isUpdating$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public errorMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  // MaxLength for the form controls
  readonly maxNameLength: number = 30;
  readonly maxDescriptionLength: number = 2000;

  constructor(
    private fb: FormBuilder,
    private boatService: BoatService,
    private toastService: ToastService
  ) {
    // Initialize the form with validators
    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(this.maxNameLength)]],
      description: ['', [Validators.required, Validators.maxLength(this.maxDescriptionLength)]]
    });
  }

  // On component initialization
  ngOnInit(): void {
    this.fetchBoatDetails();
  }

  // Update the boat
  update(): void {
    if (this.updateForm.valid) {
      this.isUpdating$.next(true);
      this.errorMessage$.next('');

      this.boatService.updateBoat(
        this.updateForm.value.name,
        this.updateForm.value.description,
        this.boat.id
      ).subscribe(
        () => {
          this.closeModal();
          this.success();
        },
        (error) => {
          this.isUpdating$.next(false);
          this.errorMessage$.next(error.error?.message || 'An error occurred');
        }
      );
    }
  }

  // Emit a success event
  success(): void {
    this.triggerToast(`Your boat ${this.boat.name} has been successfully updated!`, ToastType.Success);
    this.confirm.emit();
  }

  // Close the modal
  closeModal(): void {
    this.cancel.emit();
  }

  // Trigger a toast
  triggerToast(message: string, type: ToastType) {
    this.toastService.show(message, type);
  }

  // Fetch the boat details
  private fetchBoatDetails(): void {
    this.boatService.getBoat(this.boat.id).subscribe(
      (boat) => {
        this.updateForm.patchValue(boat);
        this.isLoading$.next(false);
      },
      (error) => {
        // Handle error here
        this.closeModal();
        this.triggerToast(`Unable to load your boat`, ToastType.Error);
      }
    );
  }
}
