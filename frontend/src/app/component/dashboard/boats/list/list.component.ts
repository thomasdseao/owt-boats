import {Component, OnInit} from '@angular/core';
import {BoatService} from "../../../../service/boat.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Boat} from "../../../../model/boat.model";
import {ToastService, ToastType} from "../../../../service/toast.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  // Public properties for state management
  boats$: BehaviorSubject<Boat[]> = new BehaviorSubject<Boat[]>([]);
  showConfirmDialog: boolean = false;
  showCreateModal: boolean = false;
  showUpdateModal: boolean = false;
  showDetailsModal: boolean = false;

  // Objects for actions
  selectedBoat: Boat = new Boat();

  // Messages for modals
  confirmMessage: string = '';
  protected readonly Boat = Boat;

  constructor(
    private boatService: BoatService,
    private toastService: ToastService
  ) {
  }

  // OnInit lifecycle hook
  ngOnInit(): void {
    this.getBoats();
  }

  // Fetch boats from the service
  getBoats(): void {
    this.boatService.getBoats().subscribe(
      (boats) => {
        this.boats$.next(boats);
      },
      () => {
        this.triggerToast(`Failed to retrieve your boats, please refresh your page`, ToastType.Error);
      }
    );
  }

  // Prepare to delete a boat
  deleteBoat(boat: Boat): void {
    this.selectedBoat = boat;
    this.confirmMessage = `Are you sure you want to delete the boat named ${boat.name} ?`;
    this.showConfirmDialog = true;
  }

  // Confirm the boat deletion
  onDeleteConfirm(): void {
    if (this.selectedBoat) {
      this.boatService.deleteBoat(this.selectedBoat.id).subscribe(
        () => {
          this.boats$.next(this.boats$.value.filter(boat => boat.id !== this.selectedBoat.id));
          this.triggerToast(`You successfully deleted your boat: ${this.selectedBoat.name}`, ToastType.Success);
        },
        (error) => {
          // Handle error here and show toast
          this.triggerToast(`Failed to delete boat: ${this.selectedBoat.name}`, ToastType.Error);
        }
      );
    }
    this.showConfirmDialog = false;
  }

  // Cancel the boat deletion
  onDeleteCancel(): void {
    this.showConfirmDialog = false;
  }

  // Open the create boat modal
  openCreateModal(): void {
    this.showCreateModal = true;
  }

  // Show a success toast after successful creation
  openSuccessCreateToast(): void {
    this.triggerToast(`Your new boat has been successfully added!`, ToastType.Success);
    this.getBoats();
  }

  // Close the create boat modal
  closeCreateModal(): void {
    this.showCreateModal = false;
  }

  // Open the update boat modal
  openUpdateModal(boat: Boat): void {
    this.selectedBoat = boat;
    this.showUpdateModal = true;
  }

  // Show a success toast after a successful update
  onSuccessUpdate(): void {
    this.getBoats();
  }

  // Close the update boat modal
  closeUpdateModal(): void {
    this.showUpdateModal = false;
  }

  // Open the details boat modal
  openDetailsModal(boat: Boat): void {
    this.showDetailsModal = true;
    this.selectedBoat = boat;
  }

  // Close the details boat modal
  closeDetailsModal(): void {
    this.showDetailsModal = false;
  }

  // Trigger a toast
  triggerToast(message: string, type: ToastType) {
    this.toastService.show(message, type);
  }
}
