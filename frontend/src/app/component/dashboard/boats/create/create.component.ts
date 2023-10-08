import {Component, EventEmitter, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BoatService} from "../../../../service/boat.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  // Form Group for the create boat form
  createForm: FormGroup;

  // Flags and Observables for UI states
  isLoading: boolean = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoading);

  errorMessage: string = "";
  errorMessage$: BehaviorSubject<string> = new BehaviorSubject<string>(this.errorMessage);

  // MaxLength for the form controls
  readonly maxNameLength: number = 30;
  readonly maxDescriptionLength: number = 2000;

  // Output event emitters for parent component communication
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private boatService: BoatService
  ) {
    // Initialize create boat form with validations
    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(this.maxNameLength)]],
      description: ['', [Validators.required, Validators.maxLength(this.maxDescriptionLength)]]
    });
  }

  // Function to handle boat creation
  create(): void {
    // Validate the form before proceeding
    if (this.createForm.valid) {
      // Set loading state for UI
      this.isLoading$.next(true);
      // Clear any existing error messages
      this.errorMessage$.next("");

      // Call createBoat method from the boat service
      this.boatService.createBoat(this.createForm.value.name, this.createForm.value.description).subscribe(
        () => {
          // On success, close the modal and emit the confirm event
          this.closeModal();
          this.success();
        },
        (error) => {
          // On failure, update UI states
          this.isLoading$.next(false);
          this.errorMessage$.next(error.error?.message || 'An error occurred');
        }
      );
    }
  }

  // Function to emit the confirm event, indicating a successful creation
  success(): void {
    this.confirm.emit();
  }

  // Function to emit the cancel event, closing the modal
  closeModal(): void {
    this.cancel.emit();
  }
}
