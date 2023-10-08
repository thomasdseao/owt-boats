package swiss.owt.boat.boat.service;

import swiss.owt.boat.boat.dto.BoatDTO;
import swiss.owt.boat.boat.request.CreateBoatRequest;
import swiss.owt.boat.boat.request.UpdateBoatRequest;

import java.util.List;

public interface BoatService {
    List<BoatDTO> getBoatsOfCurrentUser();
    BoatDTO createBoat(CreateBoatRequest createBoatRequest);
    BoatDTO updateBoat(Long id, UpdateBoatRequest updateBoatRequest);
    void deleteBoat(Long id);
    BoatDTO getBoatById(Long id);
    boolean isOwner(Long boatId);
}
