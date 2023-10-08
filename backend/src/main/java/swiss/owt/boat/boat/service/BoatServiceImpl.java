package swiss.owt.boat.boat.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import swiss.owt.boat.boat.dto.BoatDTO;
import swiss.owt.boat.boat.model.Boat;
import swiss.owt.boat.boat.repository.BoatRepository;
import swiss.owt.boat.boat.request.CreateBoatRequest;
import swiss.owt.boat.boat.request.UpdateBoatRequest;
import swiss.owt.boat.common.exception.ResourceNotFoundException;
import swiss.owt.boat.user.model.User;
import swiss.owt.boat.user.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoatServiceImpl implements BoatService {
    private final ModelMapper modelMapper;
    private final BoatRepository boatRepository;
    private final UserService userService;

    /**
     * Constructor for dependency injection.
     *
     * @param modelMapper       A ModelMapper instance for object-to-object mapping.
     * @param boatRepository    A BoatRepository instance for CRUD operations on Boat entities.
     * @param userService       A UserService instance for user-related functionalities.
     */
    public BoatServiceImpl(ModelMapper modelMapper, BoatRepository boatRepository, UserService userService) {
        this.modelMapper = modelMapper;
        this.boatRepository = boatRepository;
        this.userService = userService;
    }

    /**
     * Retrieves a list of BoatDTO objects that belong to the current user.
     *
     * @return List of BoatDTO
     */
    public List<BoatDTO> getBoatsOfCurrentUser() {
        User user = userService.getCurrentUser();
        return boatRepository.findByUserOrderByIdDesc(user).stream()
                .map(boat -> modelMapper.map(boat, BoatDTO.class))
                .collect(Collectors.toList());
    }

    /**
     * Creates a new boat with the details provided in CreateBoatRequest.
     *
     * @param createBoatRequest Object containing boat details.
     * @return Created BoatDTO object.
     */
    public BoatDTO createBoat(CreateBoatRequest createBoatRequest) {
        User user = userService.getCurrentUser();

        Boat boat = new Boat();
        boat.setName(createBoatRequest.getName());
        boat.setDescription(createBoatRequest.getDescription());
        boat.setUser(user);

        boat = boatRepository.save(boat);

        return modelMapper.map(boat, BoatDTO.class);
    }

    /**
     * Updates an existing boat identified by the id parameter.
     *
     * @param id Long Id of the boat to be updated.
     * @param updateBoatRequest Object containing new boat details.
     * @return Updated BoatDTO object.
     */
    public BoatDTO updateBoat(Long id, UpdateBoatRequest updateBoatRequest) {
        Boat existingBoat = findBoatById(id);
        existingBoat.setName(updateBoatRequest.getName());
        existingBoat.setDescription(updateBoatRequest.getDescription());

        Boat updatedBoat = boatRepository.save(existingBoat);

        return modelMapper.map(updatedBoat, BoatDTO.class);
    }

    /**
     * Deletes a boat identified by the id parameter.
     *
     * @param id Long Id of the boat to be deleted.
     */
    public void deleteBoat(Long id) {
        Boat existingBoat = findBoatById(id);
        boatRepository.delete(existingBoat);
    }

    /**
     * Retrieves a BoatDTO object identified by the id parameter.
     *
     * @param id Long Id of the boat.
     * @return BoatDTO object.
     */
    public BoatDTO getBoatById(Long id) {
        Boat boat = findBoatById(id);
        return modelMapper.map(boat, BoatDTO.class);
    }

    /**
     * Checks if the current user is the owner of the boat identified by the boatId parameter.
     *
     * @param boatId Long Id of the boat.
     * @return True if the user is the owner, otherwise False.
     */
    public boolean isOwner(Long boatId) {
        Boat boat = findBoatById(boatId);
        User currentUser = userService.getCurrentUser();
        return boat.getUser().getId().equals(currentUser.getId());
    }

    /**
     * Finds a Boat by its ID, throws ResourceNotFoundException if not found.
     *
     * @param id Long Id of the boat.
     * @return Boat object.
     */
    private Boat findBoatById(Long id) {
        return boatRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Boat not found with id " + id));
    }
}