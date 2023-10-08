package swiss.owt.boat.boat.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import swiss.owt.boat.boat.model.Boat;
import swiss.owt.boat.user.model.User;

public interface BoatRepository extends JpaRepository<Boat, Long> {
    Optional<Boat> findByName(String name);

    List<Boat> findByUser(User user);

    List<Boat> findByUserOrderByIdDesc(User user);
}