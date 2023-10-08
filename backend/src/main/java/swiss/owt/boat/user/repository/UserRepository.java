package swiss.owt.boat.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import swiss.owt.boat.user.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}