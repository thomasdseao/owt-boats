package swiss.owt.boat.boat.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import swiss.owt.boat.authentication.dto.JwtToken;
import swiss.owt.boat.boat.dto.BoatDTO;
import swiss.owt.boat.boat.model.Boat;
import swiss.owt.boat.boat.request.CreateBoatRequest;
import swiss.owt.boat.boat.request.UpdateBoatRequest;
import swiss.owt.boat.boat.response.*;
import swiss.owt.boat.boat.service.BoatService;
import swiss.owt.boat.common.response.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("/api/v1/boats")
public class BoatController {
    private final BoatService boatService;

    public BoatController(BoatService boatService) {
        this.boatService = boatService;
    }

    /**
     * Fetches the list of boats owned by the current user.
     *
     * @return A list of BoatDTO wrapped in a BoatsResponse object.
     */
    @GetMapping()
    public BoatsResponse getBoats() {
        List<BoatDTO> boats = boatService.getBoatsOfCurrentUser();
        return new BoatsResponse(boats);
    }

    /**
     * Fetches a specific boat by its ID.
     *
     * @param id The ID of the boat to fetch.
     * @return The BoatDTO wrapped in a BoatResponse object.
     */
    @GetMapping("/{id}")
    @PreAuthorize("@boatServiceImpl.isOwner(#id)")
    public BoatResponse getBoatById(@PathVariable Long id) {
        BoatDTO boat = boatService.getBoatById(id);
        return new BoatResponse(boat);
    }

    /**
     * Creates a new boat.
     *
     * @param createBoatRequest The request object containing the boat data.
     * @return The created BoatDTO wrapped in a CreateBoatResponse object.
     */
    @PostMapping
    public CreateBoatResponse createBoat(@RequestBody @Valid CreateBoatRequest createBoatRequest) {
        BoatDTO createdBoat = boatService.createBoat(createBoatRequest);
        return new CreateBoatResponse(createdBoat);
    }

    /**
     * Updates an existing boat.
     *
     * @param id                The ID of the boat to update.
     * @param updateBoatRequest The request object containing the updated boat data.
     * @return The updated BoatDTO wrapped in a UpdateBoatResponse object.
     */
    @PutMapping("/{id}")
    @PreAuthorize("@boatServiceImpl.isOwner(#id)")
    public UpdateBoatResponse updateBoat(@PathVariable("id") Long id, @RequestBody @Valid UpdateBoatRequest updateBoatRequest) {
        BoatDTO updatedBoat = boatService.updateBoat(id, updateBoatRequest);
        return new UpdateBoatResponse(updatedBoat);
    }

    /**
     * Deletes a boat.
     *
     * @param id The ID of the boat to delete.
     * @return A DeleteBoatResponse object indicating the deletion was successful.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("@boatServiceImpl.isOwner(#id)")
    public DeleteBoatResponse deleteBoat(@PathVariable("id") Long id) {
        boatService.deleteBoat(id);
        return new DeleteBoatResponse();
    }
}
