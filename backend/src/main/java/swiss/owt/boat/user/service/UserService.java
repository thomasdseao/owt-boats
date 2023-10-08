package swiss.owt.boat.user.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import swiss.owt.boat.common.exception.ResourceNotFoundException;
import swiss.owt.boat.user.model.User;

/**
 * Interface defining the contract for user-related services.
 */
public interface UserService {

    /**
     * Loads a user by their email.
     *
     * @param email the email to search for
     * @return UserDetails object with user information
     * @throws UsernameNotFoundException if the user is not found
     */
    UserDetails loadUserByUsername(String email) throws UsernameNotFoundException;

    /**
     * Finds a user by their email.
     *
     * @param email the email to search for
     * @return a User object
     * @throws ResourceNotFoundException if the user is not found
     */
    User findByEmail(String email) throws ResourceNotFoundException;

    /**
     * Retrieves the currently authenticated user.
     *
     * @return the current User object
     * @throws IllegalStateException if the current user is not found
     */
    User getCurrentUser() throws IllegalStateException;
}
